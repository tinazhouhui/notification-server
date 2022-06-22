import seedData from './data.json';
import {IComment, ILike} from '../app/interfaces';
import {createUser} from '../app/models/user.model';
import {createPost} from '../app/models/post.model';
import {createLike} from '../app/models/like.model';
import {createComment} from '../app/models/comment.model';

async function populateWithSeedData(seedData: IComment[]|ILike[]) {
	for (const notification of seedData) {
		const {user, post} = notification;
		// save users
		await createUser(user);

		// save posts
		await createPost(post);

		// save likes and comments

		if (notification.type === 'Like') {
			await createLike(notification, post, user);
		} else {
			await createComment(notification, post, user);
		}
	}
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
populateWithSeedData(seedData).then(() => {
	console.log('all seed data added');
});
