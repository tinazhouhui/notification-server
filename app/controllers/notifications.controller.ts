import {Request, Response} from 'express';
import {getComments} from '../models/comment.model';
import {getLikes} from '../models/like.model';

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
		res.send({error: err.stack});
	}
}
