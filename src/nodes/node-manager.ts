import API from "./api";
import {Author, CommentListItem, ListItem, Post, Comment, Like, InboxListItem, Activity, Follow} from "../index";
import { getURL } from ".";


const memo = (callback:any) => {
  const cache = new Map();
  return (...args:any) => {
    const selector = JSON.stringify(args);
    if (cache.has(selector)) return cache.get(selector);
    const value = callback(...args);
    cache.set(selector, value);
    return value;
  };
};

class NodeManager  {

    private nodes: {
        [key: string]: API;
    }

    

    constructor(nodes: { [key: string]: API }) {
        this.nodes = nodes;

        
    }

    public addNode(key:string, api:API): void {
        this.nodes[key] = api;

    }

    public removeNode(nodeId: string): void {
        delete this.nodes[nodeId];

    }

    public getNodes(): {[key: string]:API} {
        return this.nodes;
    }

    public async checkAuthorExists(authorId: string): Promise<boolean> {
        for (const node of Object.values(this.nodes)) {
            if (node.getNodeType() === "local") {
                // check cache first
                if (await node.getAuthor(authorId)) {
                    return true;
                }
            }
        }
        return false;
    }

    public async getAuthor(authorId: string, nodeId:string = 'all'): Promise<Author | null> {
        if (nodeId === 'all') {
            for (const node of Object.values(this.nodes)) {
                // check cache first
                const author = await node.getAuthor(authorId);
                if (author) {
                    if (author.id)
                    author.url = author.id; 
                    return author;
                }
            }
            return null;
        } else {
            return await this.nodes[nodeId].getAuthor(authorId);
        }
    }


    public async createAuthor(author:Author) {
        for (const node of Object.values(this.nodes)) {
            if (node.getNodeType() === "local") {
                await node.createAuthor(author);
            }

        }
        return;
    }

    public async  getAuthors(page:number = 0, size:number = 25, nodeId:string = 'all', query=""):Promise<ListItem<Author>> {
        
        if (nodeId === 'all') {
            
            let authors: Author[] = [];
            for (const node of Object.values(this.nodes)) {
                
                const results = await node.getAuthors(page, size, query);

                if (results.items)
                authors = authors.concat(results.items);
            }
            return {
                type: "authors",
                items: authors
            }
        } else {
            return await this.nodes[nodeId].getAuthors(page, size, query);
        }
    }

    public async updateAuthor(authorId: string, data:Author): Promise<Author | null> {
        for (const node of Object.values(this.nodes)) {
            if (node.getNodeType() === "local") {
                await node.updateAuthor(authorId, data);
            }
        }


        throw new Error("No local node found");
    }

    // FIXME: Why not use api.getFollowers() instead? it gets all of an author's followers without having to loop like this.
    public async getFollowers(authorId: string, nodeId:string = 'all'): Promise<ListItem<Author>> {
        if (nodeId === 'all') {
            let authors: Author[] = [];
            let requests = [];
            for (const node of Object.values(this.nodes)) {
                requests.push(node.getFollowers(authorId))
            }

            const results = await Promise.all(requests);

            for (const result of results) {
                if (result.items)
                authors = authors.concat(result.items);
            }
            return {
                type: "authors",
                items: authors
            }
        } else {
            return await this.nodes[nodeId].getFollowers(authorId);
        }
    }

    public async isPostLiked(postId: string, authorId: string): Promise<boolean> {
        for (const node of Object.values(this.nodes)) {
            const result = await node.isPostLiked(postId, authorId);
            if (result) {
                return true;
            }
        }
        return false;
    }

    public async isCommentLiked(commentId: string, authorId: string): Promise<boolean> {
        for (const node of Object.values(this.nodes)) {
            const result = await node.isCommentLiked(commentId, authorId);
            if (result) {
                return true;
            }
        }
        return false;
    }

    public async alertNewPost(authorId:string, post: Post): Promise<void> {
        let requests = [];
        for (const node of Object.values(this.nodes)) {
            requests.push(node.alertNewPost(authorId, post))
    }

        await Promise.all(requests);
}

    public async addFollower(authorId: string, foreignAuthorId: string): Promise<void> {
        for (const node of Object.values(this.nodes)) {
            if (node.getNodeType() === "local") {
                return await node.addFollower(authorId, foreignAuthorId);
            }
        }
        throw new Error("No local node found");
    }

    public async checkFollowerStatus(authorId: string, foreignAuthorId: string): Promise<string> {
        // check cache first
        let author = await this.getAuthor(authorId);
            if (author?.id) {
                let nodeId = getURL(author.id);
                let node = this.nodes[nodeId];
                if (node) {
                    return await node.checkFollowerStatus(authorId, foreignAuthorId);
                }
            }
        
        return "not_friends"
    }

    public async removeFollower(authorId: string, foreignAuthorId: string): Promise<void> {
        for (const node of Object.values(this.nodes)) {
            if (node.getNodeType() === "local") {
                return await node.removeFollower(authorId, foreignAuthorId);
            }
        }
        throw new Error("No local node found");
    }

    public async sendFollowRequest(authorTo:Author, authorFrom:Author):Promise<void> {
        
        let authorUrl = getURL(authorTo.id || "");
        let node = this.nodes[authorUrl];
        if (node) {
            
            return await node.sendFollowRequest(authorTo, authorFrom);
        }
        
    }

    public async getPost(authorId:string, postId: string): Promise<Post | null> {
       // find author in cache

            let author = await this.getAuthor(authorId);
            let nodeId = author?.id 
            nodeId = getURL(nodeId || "");
                if (nodeId) {
                    return await this.nodes[nodeId].getPost(authorId, postId);
            }
         
        return null;
    }

    public async getPosts(authorId:string, nodeId:string = 'all'): Promise<ListItem<Post>> {
        // check cache for author
        let author = await this.getAuthor(authorId);

        if (!author) {
            return {
                type: "posts",
                items: []
            }
        }

            let node = author?.id
            nodeId = getURL(node || "");
           
            if (node) {
                return await this.nodes[nodeId].getPosts(authorId);
            }

            return await this.nodes[nodeId].getPosts(authorId);
        
    }

    public async createPost(authorId: string, post: Post): Promise<Post | null> {
        for (const node of Object.values(this.nodes)) {
            if (node.getNodeType() === "local") {
                return await node.createPost(authorId, post);
            }
        }
        throw new Error("No local node found");
    }

    public async updatePost(authorId: string, postId: string, post: Post): Promise<Post> {
        for (const node of Object.values(this.nodes)) {
            if (node.getNodeType() === "local") {
                return await node.updatePost(authorId, postId, post);
            }
        }
        throw new Error("No local node found");
    }

    public async deletePost(authorId: string, postId: string): Promise<void> {
        for (const node of Object.values(this.nodes)) {
            if (node.getNodeType() === "local") {
                return await node.deletePost(authorId, postId);
            }
        }
        throw new Error("No local node found");
    }

    public async getComments(authorId:string, postId: string, page:number = 0, size:number = 25): Promise<CommentListItem> {

        // check cache for author
        let author = await this.getAuthor(authorId);

            let nodeId = author?.id 
            nodeId = getURL(nodeId || "");
            if (nodeId) {
                return await this.nodes[nodeId].getComments(authorId, postId, page, size);
            }
        

            let comments: Comment[] = [];
            let post =''
            let id = ''
            for (const node of Object.values(this.nodes)) {
                const results = await node.getComments(authorId, postId, page, size);
                
                if (results.post) {
                    post = results.post;
                }
                if (results.id) {
                    id = results.id;
                }
                if (results.comments) {
                    comments = comments.concat(results.comments);
                }
            }
            return {
                type: "comments",
                comments: comments,
                page: page,
                post: post,
                size: size,
                id: id
    }
}

    public async createComment(authorId: string, postId: string, comment: Comment): Promise<Comment | null> {

            let author = await this.getAuthor(authorId);
            
            let nodeId = author?.id 
            nodeId = getURL(nodeId || "");

            if (nodeId) {
                return await this.nodes[nodeId].createComment(authorId, postId, comment);
            }
        

        return null;
    }

    public async createLike(authorId: string, post:Post, authorFrom:Author): Promise<void> {
        // GET author from cache
            let author = await this.getAuthor(authorId);
            let nodeId = author?.id 
            nodeId = getURL(nodeId || "");
            if (nodeId) {
                return await this.nodes[nodeId].createLike(authorId, post, authorFrom);
            }
       
    }

    public async createCommentLike(authorId: string, comment:Comment, authorFrom:Author):Promise<void> {
        // GET author from cache
        
            let author = await this.getAuthor(authorId);
            let nodeId = author?.id 
            nodeId = getURL(nodeId || "");
            if (nodeId) {
                return await this.nodes[nodeId].createCommentLike(authorId, comment, authorFrom);
            }
        
    }

    public async getLiked(authorId:string, nodeId:string = 'all'): Promise<ListItem<Like>> {
        if (nodeId === 'all') {
            let likes: Like[] = [];
            for (const node of Object.values(this.nodes)) {
                const results = await node.getLiked(authorId);

                if (results.items)
                likes = likes.concat(results.items);
            }
            return {
                type: "likes",
                items: likes
            }
        } else {
            return await this.nodes[nodeId].getLiked(authorId);
        }
    }

    public async sendToInbox(authorId: string, inboxItem: Activity): Promise<void> {
            let author = await this.getAuthor(authorId);
            let nodeId = author?.id 
            nodeId = getURL(nodeId || "");
            if (nodeId) {
                return await this.nodes[nodeId].sendToInbox(authorId, inboxItem);
            }
         
    }

    
    public async getInbox(authorId: string): Promise<InboxListItem> {
        for (const node of Object.values(this.nodes)) {
            if (node.getNodeType() === "local") {
                let inbox = await node.getInbox(authorId);
                // iterate through inbox items 
                let inboxItems = inbox.items;
                let inboxItemsNew: (Like | Comment | Follow | Post | undefined)[] = [];
                if (inboxItems) {
                    let inboxPosts = inboxItems.map(async (item) => {
                        if (item.type === 'post') {
                            let id = item.id?.split('/').pop() || '';
                            let post = await this.getPost(authorId, id);
                            if (post) {
                                return post;
                            }
                        }
                    });
                    let allInboxPosts = await Promise.all(inboxPosts);
                
                    // iterate through inbox items
                    for (let i = 0; i < inboxItems.length; i++) {
                        if (inboxItems[i].type === 'post') {
                            inboxItemsNew.push(allInboxPosts[i]);
                        } else {
                            inboxItemsNew.push(inboxItems[i]);
                        }
                    }
                    // remove undefined items
                    inboxItemsNew = inboxItemsNew.filter((item) => item !== undefined);
                    inbox.items = inboxItemsNew as (Like | Comment | Follow | Post)[];
                    return inbox;
                }

                
                
            }
        }
        throw new Error("No local node found");
    }

    public async clearInbox(authorId: string): Promise<void> {
        for (const node of Object.values(this.nodes)) {
            if (node.getNodeType() === "local") {
                return await node.clearInbox(authorId);
            }
        }
        throw new Error("No local node found");
    }
    

}

export default NodeManager;