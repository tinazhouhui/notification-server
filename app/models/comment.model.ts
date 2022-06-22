import {prismaClient} from '../db/client';

export async function getComments (id: string): Promise<any[]> {
	return await prismaClient.comment.findMany({
		where: {
			postId: id,
			read: false
		},
		select: {
			id: true,
			text: true,
			user: true
		}
	});
}
