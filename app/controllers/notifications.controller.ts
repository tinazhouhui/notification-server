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
        const {type} = req.params;

        const notification = req.body;
        const {user, post} = notification;

        // this would probably not be here in real production scenario as users and posts would be created
        await createUser(user);
        await createPost(post);


        switch (type) {
        case 'like': {
            const newLike = await createLike(post, user);
            // userID would be probably taken from a jwt token or some other authentication service
            const newNotification = newLike?.id && await createNotification(['1111myuniqueid2222'], newLike.id, undefined);
            res.send({data: newNotification});
        }
            break;
        case 'comment': {
            const newComment = await createComment(notification.comment, post, user);
            // userID would be probably taken from a jwt token or some other authentication service
            const newNotification = newComment?.id && await createNotification(['1111myuniqueid2222'], undefined, newComment.id);
            res.send({data: newNotification});
        }
            break;
        default: {
            res.status(404);
            res.send({error: `endpoint ${type} not found`});
        }
        }

    } catch (err: any) {
        console.error(err.stack);
        res.status(500);
        res.send({
            message: 'could not create new notification',
            error: err.stack
        });
    }
}

export async function markAsRead(req: Request, res: Response): Promise<void> {
    try {
        const {type, id} = req.params;

        switch (type) {
        case 'like': {
            await markLikeAsRead(id);
            res.send({data: 'like updated'});
        }
            break;
        case 'comment': {
            await markCommentAsRead(id);
            res.send({data: 'comment updated'});
        }
            break;
        default: {
            res.status(404);
            res.send({error: `endpoint ${type} not found`});
        }
        }

    } catch (err: any) {
        console.error(err.stack);
        res.status(500);
        res.send({
            message: 'could not change notification to read',
            error: err.stack
        });
    }
}
