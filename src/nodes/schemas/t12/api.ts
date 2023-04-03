import APIBase from '../../api'
import { AxiosRequestConfig } from 'axios';
import { Author, CommentListItem, ListItem, Post, Comment, Activity, T12PostFormat } from '@/index';
import { ServiceService as AuthorService, OpenAPI } from './gen';

OpenAPI.BASE = process.env.NEXT_PUBLIC_T12_API_URL || 'https://cmput404-project-data.herokuapp.com';
OpenAPI.USERNAME = process.env.NEXT_PUBLIC_T12_UNAME;
OpenAPI.PASSWORD = process.env.NEXT_PUBLIC_T12_PW;

class API12 extends APIBase {
    constructor(apiUrl: string, axiosConfig: AxiosRequestConfig) {
        super(apiUrl, axiosConfig, 'remote');
    }

    public override async sendFollowRequest(authorTo:Author, authorFrom:Author):Promise<void> {
        let id = authorTo.id ||'a';
        try {
            await AuthorService.serviceAuthorsInboxCreate(id, {
                followRequest:{
                    type: "follow",
                    summary: `${authorFrom.displayName || "Someone"} wants to follow you`,
                    author: {
                        id: authorFrom.id || '',
                        url: authorFrom.url || '',
                        host: authorFrom.host || '',
                        displayName: authorFrom.displayName || '',
                        github: authorFrom.github || '',
                        profileImage: authorFrom.profileImage || ''
                    }
                }
            })
        } catch (e) {
            console.error(e)
        }
    }

    private postAdapter(post:Post): T12PostFormat {
        delete post.author?.created_at;
        return {
            type: "post",
            post: {
                id: post.id || "",
                title: post.title || "",
                source: post.source || "",
                origin: post.origin || "",
                description: post.description || "",
                contentType: post.contentType || "",
                content: post.content || "",
                visibility: post.visibility || "PUBLIC",
                unlisted: post.unlisted || false,
                author: post.author,
                comments: post.comments || "",
                published: post.published || "",
            }, 
            sender: post.author,
        
        }  
    }

    public override async sendToInbox(authorId:string, activity:Activity):Promise<void> {
        if (activity.type === "post") {
            let post = activity as Post;
            let id = authorId || 'a';
            try {
                await this.axiosInstance.post(`/service/authors/${authorId}/inbox/`, this.postAdapter(post));
            } catch (e) {
                console.error(e);
            }
        }
    }


    public override async getAuthors(page?: number, size?: number, query?: string): Promise<ListItem<Author>> {
       try {
        let result = await AuthorService.serviceAuthorsList();
        return result as ListItem<Author>;
       }
         catch (e) {
            return {
                type: "authors",
                items: []
            }
         }
    }

    public override async getAuthor(authorId: string): Promise<Author | null> {
       try {
         let result = await AuthorService.serviceAuthorsRead(authorId);
        return result.items as Author;
       } catch (e) {
              return null;
       }
    } 

    public override async getFollowers(authorId: string): Promise<ListItem<Author>> {
        try {
            let result = await AuthorService.serviceAuthorsFollowersList(authorId);
            return result as ListItem<Author>;
        } catch (e) {
            return {
                type: "authors",
                items: []
            }
        }
    }

    public override async getPosts(authorId: string): Promise<ListItem<Post>> {
        try {
            let result = await  AuthorService.serviceAuthorsPostsList(authorId)
            return result as ListItem<Post>;
        } catch (e) {
            return {
                type: "posts",
                items: []
            }
        }
    }

    public override async getPost(authorId: string, postId: string): Promise<Post | null> {
        try {
            let result = await AuthorService.serviceAuthorsPostsRead(authorId, postId);

            return result as Post;
        } catch (e) {
            return null;
        }
    }

    public override async getComments(authorId: string, postId: string, page?: number, size?: number): Promise<CommentListItem> {
       try {
         let result = await AuthorService.serviceAuthorsPostsCommentsList(authorId, postId);
        result.comments = result.items
         return result as CommentListItem;
       } catch (e) {
                return {
                    type: "comments",
                    comments: []
                }
       }
    }


}

export default API12;