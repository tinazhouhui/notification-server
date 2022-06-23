import {IUser} from '../interfaces';
import {prismaClient} from '../db/client';

export async function createUser(user: IUser) {
    try {
        await prismaClient.user.upsert({
            where: {
                id: user.id
            },
            update: {},
            create: user
        });
    } catch (err: any) {
        console.error(`user ${user.id} not created`, err.stack);
    }
}
