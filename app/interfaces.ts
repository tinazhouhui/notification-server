export interface IUser {
    id: string,
    name: string
}

export interface IPost {
    id: string,
    title: string,
}

export interface ILikeNotification {
    type: 'Like',
    read: boolean,
    post: IPost,
    user: IUser
}

export interface ICommentNotification {
    type: 'Comment',
    read: boolean,
    post: IPost,
    user: IUser,
    comment: IComment
}

export interface IComment {
    id: string,
    commentText: string
}
