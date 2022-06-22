import Router from 'express';
import {getNotifications} from './controllers/notifications.controller';

const router = Router();

router.get('/notifications/:id', getNotifications);

router.post('/notifications/:id', (req, res) => {
	res.send({msg: 'POST'});
});

router.put('/notifications/:id', (req, res) => {
	res.send({msg: 'PUT'});
});


export default router;
