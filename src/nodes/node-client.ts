import APIClient from "./api-client";
import {Author, CommentListItem, ListItem, Post, Comment, Like, InboxListItem} from "../index";


class NodeClient  {
    private APIInstance: APIClient;

    constructor(APIInstance: APIClient) {
        this.APIInstance = APIInstance;
    }

    public async checkAuthorExists(authorId: string): Promise<boolean> {
        const author = await this.APIInstance.getAuthor(authorId);
        return author !== null;
    }

    public async getAuthor(authorId: string): Promise<Author | null> {
        return await this.APIInstance.getAuthor(authorId);
    }

    public async createAuthor(author:Author) {
        return await this.APIInstance.createAuthor(author);
    }

    public async  getAuthors(page:number = 0, size:number = 25, query=""):Promise<ListItem<Author>> {
        return await this.APIInstance.getAuthors(page, size, query);
    }

    public async updateAuthor(authorId: string, data:Author): Promise<Author | null> {
        return await this.APIInstance.updateAuthor(authorId, data);
    }

    public async getFollowers(authorId: string): Promise<ListItem<Author>> {
        return await this.APIInstance.getFollowers(authorId);
    }

    public async isPostLiked(postId: string, authorId: string): Promise<boolean> {
        return await this.APIInstance.isPostLiked(postId, authorId);
    }

    public async isCommentLiked(commentId: string, authorId: string): Promise<boolean> {
        return await this.APIInstance.isCommentLiked(commentId, authorId);
    }

    public async alertNewPost(authorId:string, post: Post): Promise<void> {
        return await this.APIInstance.alertNewPost(authorId, post);
    }

    public async alertNewPostAuthors(authorId:string, post: Post, authors:string[]): Promise<void> {
        return await this.APIInstance.alertNewPostAuthors(authorId, post, authors);
    }


    public async addFollower(authorId: string, foreignAuthorId: string): Promise<void> {
        await this.APIInstance.addFollower(authorId, foreignAuthorId);
    }

    public async checkFollowerStatus(authorId: string, foreignAuthorId: string): Promise<string> {
        return await this.APIInstance.checkFollowerStatus(authorId, foreignAuthorId);
    }

    public async removeFollower(authorId: string, foreignAuthorId: string): Promise<void> {
        
        await this.APIInstance.removeFollower(authorId, foreignAuthorId);
    }

    public async sendFollowRequest(authorTo:Author, authorFrom:Author):Promise<void> {
       try {
             await this.APIInstance.sendFollowRequest(authorTo, authorFrom);
       } catch (e) {
            throw new Error("Error sending follow request");
       }
    }

    public async getPost(authorId:string, postId: string): Promise<Post | null> {
       
      return await this.APIInstance.getPost(authorId, postId);
    }

    public async getPosts(authorId:string): Promise<ListItem<Post>> {
        return await this.APIInstance.getPosts(authorId);
    }

    public async createPost(authorId: string, post: Post): Promise<Post | null> {
        return await this.APIInstance.createPost(authorId, post);
    }

    public async updatePost(authorId: string, postId: string, post: Post): Promise<Post> {
        return await this.APIInstance.updatePost(authorId, postId, post);
    }

    public async deletePost(authorId: string, postId: string): Promise<void> {
        await this.APIInstance.deletePost(authorId, postId);
    }

    public async getComments(authorId:string, postId: string, page:number = 0, size:number = 25): Promise<CommentListItem> {
        return await this.APIInstance.getComments(authorId, postId, page, size);
    }

    public async createComment(authorId: string, postId: string, comment: Comment): Promise<Comment | null> {
        
        return await this.APIInstance.createComment(authorId, postId, comment);
    }

    public async createLike(authorId: string, post:Post, authorFrom:Author): Promise<void> {
        return await this.APIInstance.createLike(authorId, post, authorFrom);
    }

    public async createCommentLike(authorId: string, comment:Comment, authorFrom:Author):Promise<void> {
        return await this.APIInstance.createCommentLike(authorId, comment, authorFrom);
    }

    public async getLiked(authorId:string): Promise<ListItem<Like>> {
        return await this.APIInstance.getLiked(authorId);
    }

    

    public async getInbox(authorId: string): Promise<InboxListItem> {
        return await this.APIInstance.getInbox(authorId);
    }

    public async clearInbox(authorId: string): Promise<void> {
        return await this.APIInstance.clearInbox(authorId);
    }
    

}

export default NodeClient;