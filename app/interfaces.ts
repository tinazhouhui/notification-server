export interface IUser {
    id: string,
    name: string
}

export interface IPost {
    id: string,
    title: string,
}

export interface ILike {
    type: 'Like',
    read: boolean,
    post: IPost,
    user: IUser
}

export interface IComment {
    type: 'Comment',
    read: boolean,
    post: IPost,
    user: IUser,
    comment: {
        id: string,
        commentText: string
    }
}
