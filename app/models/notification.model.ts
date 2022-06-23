import {prismaClient} from '../db/client';

export async function createNotification(userIds: string[], likeId: string | undefined, commentId: string | undefined): Promise<any[] | void> {
    try {
        const notifications = [];
        let data;

        for (const userId of userIds) {
            if (likeId) {
                data = {
                    likeId,
                    read: false,
                    userId,
                };
            } else {
                data = {
                    commentId,
                    read: false,
                    userId,
                };
            }

            const notification = await prismaClient.notification.create({
                data
            });
            notifications.push(notification);
        }
        return notifications;
    } catch (err: any) {
        console.error('notification not created', err.stack);
    }
}


export async function markCommentAsRead(commentId: string, userId = '1111myuniqueid2222') {
    try {
        return await prismaClient.notification.update({
            where: {
                commentId_userId: {
                    commentId,
                    userId
                }
            },
            data: {read: true}
        });
    } catch (err: any) {
        console.error('comment not mark as read', err.stack);
    }
}

export async function markLikeAsRead(likeId: string, userId = '1111myuniqueid2222') {
    try {
        return await prismaClient.notification.update({
            where: {
                likeId_userId: {
                    likeId,
                    userId
                },
            },
            data: {read: true}
        });
    } catch (err: any) {
        console.error('like not marked as read', err.stack);
    }
}
