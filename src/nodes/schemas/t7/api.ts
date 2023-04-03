import APIBase from '../../api'
import { AxiosRequestConfig } from 'axios';
import { Author, CommentListItem, ListItem, Post, Comment, Activity, Follow } from '@/index';
import { AuthorsService, InboxTypeEnum, OpenAPI} from './gen';

OpenAPI.BASE = process.env.NEXT_PUBLIC_T7_API_URL || 'https://sd7-api.herokuapp.com';
OpenAPI.USERNAME = process.env.NEXT_PUBLIC_T7_UNAME;
OpenAPI.PASSWORD = process.env.NEXT_PUBLIC_T7_PW;


class API7 extends APIBase {
    constructor(apiUrl: string, axiosConfig: AxiosRequestConfig) {
        super(apiUrl, axiosConfig, 'remote');
    }

    public override async sendToInbox(authorId: string, activity: Activity): Promise<void> {
        
        let author:Author | undefined;
        let summary:string = "";
        let object:string = "";
        if (activity.type === "follow") {
            author = activity.actor;
            summary = `${author?.displayName || "Someone"} wants to follow you`;
            object = activity.object?.id || '';
        } else if (activity.type === "like") {
            author = activity.author;
            summary = activity.summary || `${author?.displayName || "Someone"} liked your post`;
            object = activity.object || '';
        } else if (activity.type === "comment") {
            author = activity.author;
            summary = `${author?.displayName || "Someone"} commented on your post`;
            object = activity.id || '';
        } else if (activity.type === "post") {
            author = activity.author;
            summary = `${author?.displayName || "Someone"} posted something new`;
            object = activity.id || '';
        }
        
        let type = activity.type;
        
        try {
            await AuthorsService.authorsInboxCreate(authorId, {
                type: type as InboxTypeEnum,
                summary: summary,
                object: object,
                //@ts-ignore
                author:author
            });
        
    } catch (e) {
        console.log(e);
    }
        
        
    }

    public override async getAuthors(page: number = 1, size: number = 10, query?: string): Promise<ListItem<Author>> {
        
        
        let result = await AuthorsService.authorsList(1, size);

        return {
            type: "authors",
            items: result.items as Author[]
        }
    }

    public override async getAuthor(authorId: string): Promise<Author | null> {
        try {
            let result = await AuthorsService.authorsRetrieve(authorId);
            return result as Author;
        }
        catch (e) {
            return null;
        }
    }

    public override async getFollowers(authorId: string): Promise<ListItem<Author>> {
        try {
             let result = await AuthorsService.authorsFollowersList(authorId);

        return {
            type: "authors",
            items: result.items as Author[]
        }
        } catch (e) {
            return {
                type: "authors",
                items: []
            }
        }
       
    }

    public override async getPosts(authorId: string): Promise<ListItem<Post>> {
        try {
            let result = await AuthorsService.authorsPostsList(authorId);
        return result as ListItem<Post>;
        }  catch (e) {
            return {
                type: "posts",
                items: []
            }
        }
    }

    public override async getPost(authorId: string, postId: string): Promise<Post | null> {
        try {
            let result = await AuthorsService.authorsPostsRetrieve(authorId, postId);
            return result as unknown as Post;
        } catch (e) {
            return null;
        }
    }

    public override async getComments(authorId:string, postId: string, page:number=1, size:number=10): Promise<CommentListItem> {
        try {
            let result = await AuthorsService.authorsPostsCommentsList(authorId, postId, page, size);
        return result as unknown as CommentListItem;
        }  catch (err) {
            return {
                type: "comments",
                comments: []
            }
        }
    }
}


export default API7;