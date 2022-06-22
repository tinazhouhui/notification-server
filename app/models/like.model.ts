import {prismaClient} from '../db/client';

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
