import {Request, Response} from 'express';
import {createComment, getComments} from '../models/comment.model';
import {createLike, getLikes} from '../models/like.model';
import {createUser} from '../models/user.model';
import {createPost} from '../models/post.model';

export async function getNotifications(req: Request, res: Response) {
	const {id} = req.params;

	try {
		const likes = await getLikes(id);
		const comments = await getComments(id);

		const output = {
			notifications: {
				likes: likes.length,
				comments: comments.length,
				total: likes.length + comments.length
			}, likes, comments
		};

		res.send(output);
	} catch (err: any) {
		console.error(err.stack);
		res.status(500);
		res.send({
			message: 'could not get all notifications',
			error: err.stack
		});
	}
}

export async function createNotification(req: Request, res: Response) {
	try {
		const notification = req.body;
		const {user, post} = notification;

		await createUser(user);
		await createPost(post);

		let newNotification;
		if (notification.type === 'Like') {
			newNotification = await createLike(notification, post, user);
		} else {
			newNotification = await createComment(notification, post, user);
		}

		res.send({newNotification});
	} catch (err: any) {
		console.error(err.stack);
		res.status(500);
		res.send({
			message: 'could not create new notification',
			error: err.stack
		});
	}
}
