import {IPost} from '../interfaces';
import {prismaClient} from '../db/client';

export async function createPost (post: IPost) {
	try {
		await prismaClient.post.upsert({
			where: {
				id: post.id
			},
			update: {},
			create: post
		});
	} catch (err: any) {
		console.error(`post ${post.id} not created`, err.stack);
	}
}
