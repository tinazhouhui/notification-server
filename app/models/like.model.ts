import {prismaClient} from '../db/client';
import {ILike, IPost, IUser} from '../interfaces';

export async function getLikes (id: string): Promise<any[]> {
	return await prismaClient.like.findMany({
		where: {
			postId: id,
			read: false
		},
		select: {
			id: true,
			user: true
		}
	});
}

export async function createLike (notification: ILike, post: IPost, user: IUser) {
	try {
		return await prismaClient.like.create({
			data: {
				read: notification.read,
				postId: post.id,
				userId: user.id
			}
		});
	} catch (err: any) {
		console.error('like not created: ', err.stack);
	}
}
