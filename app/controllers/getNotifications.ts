import {Request, Response} from 'express';
import {prismaClient} from '../db/client';

export async function getNotifications(req: Request, res: Response) {
	const {id} = req.params;
	const likes = await prismaClient.like.findMany({
		where: {
			postId: id,
			read: false
		},
		select: {
			id: true,
			user: true
		}
	});

	const comments = await prismaClient.comment.findMany({
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

	const output = {
		notifications: {
			likes: likes.length,
			comments: comments.length,
			total: likes.length + comments.length
		}, likes, comments
	};

	res.send(output);
}
