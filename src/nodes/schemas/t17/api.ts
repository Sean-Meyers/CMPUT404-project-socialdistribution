import APIBase from '../../api'
import { AxiosRequestConfig } from 'axios';
// import { Author, CommentListItem, ListItem, Post, Comment } from '@/index';
import { Author, CommentListItem, ListItem, Post, Comment } from '../../..';

class API17 extends APIBase {
    private authorId = (authorId:string) => {return `${this.apiURL}/authors/${authorId}`};
    private postId = (authorId:string, postId:string) => {return `${this.authorId(authorId)}/posts/${postId}`};

    constructor(apiUrl: string, axiosConfig: AxiosRequestConfig) {
        super(apiUrl, axiosConfig, 'remote');
    }

    public override async getAuthor(authorId: string): Promise<Author | null> {
        authorId = this.authorId(authorId);
        console.debug('getAuthor authorId: ' + authorId);
        return super.getAuthor(authorId + '/');
    }

    public override async getPosts(authorId: string): Promise<ListItem<Post>> {
        authorId = this.authorId(authorId);
        console.debug('getPosts authorId: ' + authorId);
        return super.getPosts(authorId);
    }

    public override async getPost(authorId: string, postId: string): Promise<Post | null> {
        postId = this.postId(authorId, postId);     // Order matters, don't change the order of these two lines
        authorId = this.authorId(authorId);
        console.debug('getPost authorId: ' + authorId + ' postId: ' + postId);
        return super.getPost(authorId, postId + '/');
    }

    public override async getFollowers(authorId: string): Promise<ListItem<Author>> {
        authorId = this.authorId(authorId);
        console.debug('getFollowers authorId: ' + authorId);
        try {
            const results = await this.axiosInstance.get<ListItem<Author>>(`/authors/${authorId}/followers/`);
            if (results.data.items === undefined) {
                throw new Error("items is undefined");
            }
            return results.data;
        }
        catch (e) {
            return {
                type: "authors",
                items: []
            }
        }
    }

    public override async checkFollowerStatus(authorId: string, foreignAuthorId: string): Promise<string> {
        let t16APIHost = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/service';
        authorId = `${t16APIHost}/authors/${authorId}`;
        foreignAuthorId = this.authorId(foreignAuthorId);
        console.debug('checkFollowerStatus authorId: ' + authorId + ' foreignAuthorId: ' + foreignAuthorId);
        return super.checkFollowerStatus(authorId, foreignAuthorId + '/');
    }

    public override async sendFollowRequest(authorTo: Author, authorFrom: Author): Promise<void> {
        try {
            if (authorTo.id) {
                let authorId = authorTo.id;
                console.debug('sendFollowRequest authorId: ' + authorId);
                await this.sendToInbox(authorId || '', {
                        type: 'follow',
                        summary: `${authorFrom?.displayName || 'Someone'} wants to follow you`,
                        actor: authorFrom,
                        object: authorTo
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

}

export default API17;