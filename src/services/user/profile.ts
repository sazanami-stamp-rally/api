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

async function getUserDisplayName(userId: string) {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    }).then((user) => {
        return user?.display_name;
    });
}

export { setUserDisplayName, getUserDisplayName };
