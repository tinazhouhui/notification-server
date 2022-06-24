import {prismaClient} from '../db/client';
import {ILikeResponse, IPost, IUser} from '../interfaces';

export async function getLikes(id: string): Promise<ILikeResponse[]> {
    return await prismaClient.like.findMany({
        where: {
            postId: id,
            notifications: {
                every: {
                    read: false
                }
            }
        },
        select: {
            id: true,
            user: true,
        }
    });
}

export async function createLike(post: IPost, user: IUser) {
    try {
        return await prismaClient.like.upsert({
            where: {
                id: post.id + user.id
            },
            update: {},
            create: {
                id: post.id + user.id,
                postId: post.id,
                userId: user.id
            }
        });
    } catch (err: any) {
        console.error('like not created: ', err.stack);
    }
}
