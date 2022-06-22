import seedData from './data.json';
import {prismaClient} from '../app/db/client';


async function seedUsers(user: any) {
	try {
		await prismaClient.user.upsert({
			where: {
				id: user.id
			},
			update: {},
			create: user
		});
	} catch (err: any) {
		console.error('users not updated', err.stack);
	}
}

async function seedPosts(post: any) {
	try {
		await prismaClient.post.upsert({
			where: {
				id: post.id
			},
			update: {},
			create: post
		});
	} catch (err: any) {
		console.error('posts not updated', err.stack);
	}
}

async function seedLikes(notification: any, post: any, user: any) {
	try {
		await prismaClient.like.create({
			data: {
				read: notification.read,
				postId: post.id,
				userId: user.id
			}
		});
	} catch (err: any) {
		console.error('likes not updated', err.stack);
	}
}

async function seedComments(notification: any, post: any, user: any) {
	try {
		const {comment} = notification;
		await prismaClient.comment.create({
			data: {
				id: comment.id,
				read: notification.read,
				postId: post.id,
				userId: user.id,
				text: comment.commentText
			}
		});
	} catch (err: any) {
		console.error('comments not updated', err.stack);
	}
}

async function populateWithSeedData(seedData: any) {
	for (const notification of seedData) {
		const {user, post} = notification;
		// save users
		await seedUsers(user);

		// save posts
		await seedPosts(post);

		// save likes and comments

		if (notification.type === 'Like') {
			await seedLikes(notification, post, user);
		} else {
			await seedComments(notification, post, user);
		}
	}
}


populateWithSeedData(seedData).then(() => {
	console.log('all seed data added');
});
