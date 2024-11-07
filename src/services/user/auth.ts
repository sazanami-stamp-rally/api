import prisma from '@src/prisma';
import Logger from '@src/logger';

const logger = new Logger();
logger.setTags(['service', 'user', 'auth']);

/**
 * ユーザーIDが登録済みかどうかを判定
 * @param userId - 検索対象のUID
 * @returns 指定したUIDが登録されているかどうか
 */
async function checkActivated(userId: string) {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    }).then((user) => {
        if (user) return user.is_activated;
        return false; // ユーザーが存在しない場合はfalseを返す
    });
}

async function activateUser(userId: string) {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            is_activated: true
        }
    }).then((user) => {
        return user;
    });
}

export { checkActivated, activateUser };
