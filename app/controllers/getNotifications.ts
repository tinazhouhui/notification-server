// import data from '../models/data';

import {Request, Response} from 'express';

export function getNotifications (req: Request, res: Response) {
	const {id} = req.params;
	// console.log(data);
	res.send({msg: id});
}
