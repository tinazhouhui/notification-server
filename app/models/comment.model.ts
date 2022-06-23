import {prismaClient} from '../db/client';
import {IComment, IPost, IUser} from '../interfaces';

export async function getComments (id: string): Promise<any[]> {
	return await prismaClient.comment.findMany({
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
			text: true,
			user: true
		}
	});
}

export async function createComment (notification: IComment, post: IPost, user: IUser) {
	try {
		const {comment} = notification;
		return await prismaClient.comment.upsert({
			where: {
				id: comment.id
			},
			update: {},
			create: {
				id: comment.id,
				postId: post.id,
				userId: user.id,
				text: comment.commentText
			}
		});
	} catch (err: any) {
		console.error('comment not created: ', err.stack);
	}
}
