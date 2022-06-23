import seedData from './data.json';
import {ICommentNotification, ILikeNotification} from '../app/interfaces';
import {createUser} from '../app/models/user.model';
import {createPost} from '../app/models/post.model';
import {createLike} from '../app/models/like.model';
import {createComment} from '../app/models/comment.model';
import {createNotification} from '../app/models/notification.model';

async function populateWithSeedData(seedData: ICommentNotification[]|ILikeNotification[]) {
    // create user me
    await createUser({id: '1111myuniqueid2222', name: 'Me'});

    for (const notification of seedData) {
        const {user, post} = notification;
        await createUser(user);
        await createPost(post);

        let newNotification;
        if (notification.type === 'Like') {
            newNotification = await createLike(post, user);

            newNotification?.id && await createNotification(['1111myuniqueid2222'], newNotification.id, undefined);
        } else {
            newNotification = await createComment(notification.comment, post, user);
            newNotification?.id && await createNotification(['1111myuniqueid2222'], undefined, newNotification.id);
        }
    }
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
populateWithSeedData(seedData).then(() => {
    console.log('all seed data added');
});
