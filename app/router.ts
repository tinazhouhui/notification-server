import Router from 'express';
import {getNotifications} from './controllers/getNotifications';

const router = Router();

router.get('/notifications/:id', getNotifications);

router.post('/notifications', (req, res) => {
	res.send({msg: 'Get'});
});

router.put('/notifications/:id', (req, res) => {
	res.send({msg: 'Get'});
});


export default router;
