import prisma from '@src/prisma';
import Logger from '@src/logger';

const logger = new Logger();
logger.setTags(['service', 'user', 'profile']);

async function setUserDisplayName(userId: string, displayName: string) {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            display_name: displayName
        }
    }).then((user) => {
        return user;
    });
}

export { setUserDisplayName };
