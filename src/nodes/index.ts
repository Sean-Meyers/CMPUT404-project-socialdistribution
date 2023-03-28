import API from "./api";
import APIClient from "./api-client"
import NodeManager from "./node-manager";
import NodeClient from "./node-client";
import {Author, ListItem, CommentListItem, Post, Comment, Like, InboxListItem, Activity} from ".."

const LocalNode = new API(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/service', {
    auth:{
        username: process.env.NEXT_PUBLIC_FE_UNAME || "credential env failure",
        password: process.env.NEXT_PUBLIC_FE_PW || "credential env failure"
    }
}, 'local');

// const team7 = new API('https://sd7-api.herokuapp.com/api', {
//     auth:{
//         username: process.env.NEXT_PUBLIC_T7_UNAME || "credential env failure",
//         password: process.env.NEXT_PUBLIC_T7_PW || "credential env failure"
//     }
// }, 'remote');


class Team7 extends API {
    constructor() {
        super('https://sd7-api.herokuapp.com/api', {
            auth:{
                username: process.env.NEXT_PUBLIC_T7_UNAME || "credential env failure",
                password: process.env.NEXT_PUBLIC_T7_PW || "credential env failure"
            }
        }, 'remote');
    } 

    /* getFollowers is good
    example responsefro T7:
    {
        "count": 2,
        "type": "followers",
        "items": [
          {
            "type": "author",
            "id": "https://sd-7-433-api.herokuapp.com/api/authors/12fae447-fb43-4cbc-84f9-8965aab66926",
            "host": "https://sd-7-433-api.herokuapp.com",
            "displayName": "C. S. Lewis",
            "url": "https://sd-7-433-api.herokuapp.com/api/authors/12fae447-fb43-4cbc-84f9-8965aab66926",
            "github": "http://github.com/cslewis_git",
            "profileImage": "https://images.unsplash.com/photo-1626548307930-deac221f87d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&au"
          },
          {
            "type": "author",
            "id": "https://sd-7-433-api.herokuapp.com/api/authors/d3bb924f-f37b-4d14-8d8e-f38b09703bab",
            "host": "https://sd-7-433-api.herokuapp.com",
            "displayName": "J. R. R. Tolkien",
            "url": "https://sd-7-433-api.herokuapp.com/api/authors/d3bb924f-f37b-4d14-8d8e-f38b09703bab",
            "github": "http://github.com/jrrtolkien_git",
            "profileImage": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&au"
          }
        ]
      }*/

    // checkFollowerStatus: I have no idea how to use their or our endpoint for this.

    /* Send Comment to inbox test, request + response
    curl -X 'POST' \
    'https://sd-7-433-api.herokuapp.com/api/authors/12fae447-fb43-4cbc-84f9-8965aab66926/inbox/' \
    -H 'Authorization: Basic bm9kZTAxOlAqc3N3MHJkIQ==' \
    -H 'X-CSRFTOKEN: huq5x2s8zLviqjicn1Asogl4NyohYz4u31DmrDcg8DCLYa20aOsNafk4WEZn6Hzq' \
    -d '{"context": "https://www.w3.org/ns/activitystreams",
        "summary": "test comment to see if your documentation matches your app",
        "type": "comment",
        "author": {"id": "https://sd7-api.herokuapp.com/api/authors/cf573f12-71ed-4995-a63f-93b60ee3d1c9",
                  "url": "https://sd7-api.herokuapp.com/api/authors/cf573f12-71ed-4995-a63f-93b60ee3d1c9",
                  "host": "https://sd7-api.herokuapp.com",
                  "type": "author",
                  "github": "http://github.com/ianfleming_git",
                  "displayName": "Ian Lancaster Fleming",
                  "profileImage": "https://images.unsplash.com/photo-1622300896044-e26a911ca3db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
        },
        "object": "https://sd-7-433-api.herokuapp.com/api/authors/12fae447-fb43-4cbc-84f9-8965aab66926/posts/1629b94f-04cc-459e-880e-44ebe979fb7e/comments/28dfa91d-bbe1-4788-8b1d-cf375098f128"
    }'
    --->
    201 {"summary": "test comment to see if your documentation matches your app",
        "type": "comment",
        "author": "https://sd7-api.herokuapp.com/api/authors/cf573f12-71ed-4995-a63f-93b60ee3d1c9",
        "object": "https://sd-7-433-api.herokuapp.com/api/authors/12fae447-fb43-4cbc-84f9-8965aab66926/posts/1629b94f-04cc-459e-880e-44ebe979fb7e/comments/28dfa91d-bbe1-4788-8b1d-cf375098f128",
        "@context": "https://www.w3.org/ns/activitystreams"
    }
    */

    public async sendToInbox(authorId:string, activity:Activity):Promise<void> {
        interface T7MsgFormat {
            type?: 'post' | 'like' | 'follow' | 'comment'
            summary?: string
            author?: Author
            object?: string | Author
        }
        let author = activity.author ?? activity.actor;
        let buildMsg = (o):T7MsgFormat => { return {
                    type: activity.type,
                    summary: `New ${activity.type} from ${author.displayName}`,
                    author: author,
                    object: o
                }
            };
        let msg:T7MsgFormat;
        switch (activity.type) {
            case "post" || "comment":
                msg = buildMsg(activity.id);
                break;
            case "like":
                msg = buildMsg(activity.object);
                break;
            default:    // AKA case "follow":
                msg = activity;     // Not sure, but looks like they expect the same as use in regards to follows
                break;
        }
        // console.log(activity)
        const result = await this.axiosInstance.post(`/authors/${authorId}/inbox/`, msg);
        return result.data;
    }
}

const Team17 = new API('https://social-distribution-w23-t17.herokuapp.com', {
    auth:{
        username: process.env.NEXT_PUBLIC_T17_UNAME || "credential env failure",
        password: process.env.NEXT_PUBLIC_T17_PW || "credential env failure"
    }
}, 'remote');

const Team12 = new API('https://cmput404-project-data.herokuapp.com/service', {
    auth:{
        username: process.env.NEXT_PUBLIC_T12_UNAME || "credential env failure",
        password: process.env.NEXT_PUBLIC_T12_PW || "credential env failure"
    }
}, 'remote');


const nodeManager = new NodeManager({
    local: LocalNode,
    team12: Team12,
    team7: new Team7(),
    team17: Team17
});


const NextAPI = new APIClient();

const nodeClient = new NodeClient(NextAPI);

export {
    nodeClient as NodeClient,
    nodeManager as NodeManager
}
