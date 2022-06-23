import Router from 'express';
import {postNotification, getNotifications, markAsRead} from './controllers/notifications.controller';

const router = Router();

router.get('/notifications/:postId', getNotifications);

router.post('/notifications/:type', postNotification);

router.put('/notifications/:type/:id', markAsRead);


export default router;
