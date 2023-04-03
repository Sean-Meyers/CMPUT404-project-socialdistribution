declare module 'swagger-js-codegen'

export interface Author {
    type: 'author';
    id?: string;
    host?: string;
    displayName?: string;
    url?: string;
    github?: string;
    profileImage?: string;
    followers?: string[];
    following?: string[];
    created_at?: string;
}

export interface Post {
    type: "post";
    id?: string;
    title?: string;
    published?: string;
    description?: string;
    source?: string;
    origin?: string;
    contentType?: string;
    content?: string;
    author?: Author;
    categories?: string[] | string;
    count?: number;
    comments?: string;
    commentSrc?: CommentListItem<Comment>;
    visibility?: string;
    unlisted?: boolean;
}

export interface T12PostFormat {
    type?: 'post',
    post?: {
        title?: string,
        id?: string,
        description?: string,
        source?: string,
        origin?: string,
        contentType?: string,
        content?: string,
        author?: Author,
        comments?: string,
        published?: string,
        visibility?: string,
        unlisted?: boolean,
    },
    sender?: Author
}

export interface Like {
    "@context"?: string;
    summary?: string;
    type?: "like";
    author?: Author;
    object?: string;
}

export interface Follow {
    type?: "follow";
    summary?: string;
    actor?: Author;
    object?: Author;
}

export interface Comment {
    type?:"comment";
    author?: Author;
    comment?: string;
    contentType?: string;
    published?: string;
    id?: string;
}

export interface ListItem<T> {
    type?:string;
    items?: T[];
}

export interface CommentListItem extends ListItem {
    type?:"comments";
    page?: number;
    size?: number;
    post?: string;
    id?: string;
    comments?: Comment[];
}

export interface InboxListItem extends ListItem {
    type?:"inbox"
    author?:string;
    items?: (Like | Comment | Post | Follow)[];
}

export type Activity = Like | Follow | Comment | Post;

export interface T7MsgFormat {
            type?: 'post' | 'like' | 'follow' | 'comment'
            summary?: string
            author?: Author
            object?: string | Author
        }
