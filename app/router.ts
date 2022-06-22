import Router from 'express';
import {createNotification, getNotifications} from './controllers/notifications.controller';

const router = Router();

router.get('/notifications/:id', getNotifications);

router.post('/notifications', createNotification);

router.put('/notifications/:id', (req, res) => {
	res.send({msg: 'PUT'});
});


export default router;
