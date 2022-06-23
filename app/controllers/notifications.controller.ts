import {Request, Response} from 'express';
import {createComment, getComments} from '../models/comment.model';
import {createLike, getLikes} from '../models/like.model';
import {createUser} from '../models/user.model';
import {createPost} from '../models/post.model';
import {createNotification, markCommentAsRead, markLikeAsRead} from '../models/notification.model';

export async function getNotifications(req: Request, res: Response): Promise<void> {
	const {postId} = req.params;

	try {
		const results = await Promise.all([getLikes(postId), getComments(postId)]);

		const likes = results[0];
		const comments = results[1];

		const output = {
			data: {
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

export async function postNotification(req: Request, res: Response): Promise<void> {
	try {
		const notification = req.body;
		const {user, post} = notification;

		await createUser(user);
		await createPost(post);

		let newNotification;
		if (notification.type === 'Like') {
			newNotification = await createLike(post, user);
			newNotification?.id && await createNotification(['1111myuniqueid2222'], newNotification.id, undefined);
		} else {
			newNotification = await createComment(notification, post, user);
			newNotification?.id && await createNotification(['1111myuniqueid2222'], undefined, newNotification.id);
		}

		res.send({data: newNotification});
	} catch (err: any) {
		console.error(err.stack);
		res.status(500);
		res.send({
			message: 'could not create new notification',
			error: err.stack
		});
	}
}

export async function markAsRead (req: Request, res: Response): Promise<void> {
	try {
		const {type, id} = req.params;

		if (type === 'like') {
			await markLikeAsRead(id);
		} else {
			await markCommentAsRead(id);
		}

		res.send({message: 'notification updated'});

	} catch (err: any) {
		console.error(err.stack);
		res.status(500);
		res.send({
			message: 'could not change notification to read',
			error: err.stack
		});
	}
}
