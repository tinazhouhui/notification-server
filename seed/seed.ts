import seedData from './data.json';
import {prismaClient} from '../app/db/client';

interface IUser {
	id: string,
	name: string
}

interface IPost {
	id: string,
	title: string,
}

interface ILike {
	type: 'Like',
	read: boolean,
	post: IPost,
	user: IUser
}

interface IComment {
	type: 'Comment',
	read: boolean,
	post: IPost,
	user: IUser,
	comment: {
		id: string,
		commentText: string
	}
}

async function seedUsers(user: IUser) {
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

async function seedPosts(post: IPost) {
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

async function seedLikes(notification: ILike, post: IPost, user: IUser) {
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

async function seedComments(notification: IComment, post: IPost, user: IUser) {
	try {
		const {comment} = notification;
		await prismaClient.comment.upsert({
			where: {
				id: comment.id
			},
			update: {},
			create: {
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

async function populateWithSeedData(seedData: IComment[]|ILike[]) {
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


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
populateWithSeedData(seedData).then(() => {
	console.log('all seed data added');
});
