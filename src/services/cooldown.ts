import prisma from '@src/prisma';
import Logger from '@src/logger';

const logger = new Logger();
logger.setTags(['service', 'cooldown']);

async function setCooldown(userId: string, boothId: string, duration?: number) {
    if (duration === undefined) {
        duration = await prisma.booth.findUnique({
            where: {
                id: boothId
            }
        }).then((booth) => {
            if (booth === null) {
                logger.error(`ブースの取得中にエラーが発生しました: ${boothId}`);
                return 0;
            }
            return booth.cooldown_duration;
        }).catch((error) => {
            logger.error(`デフォルトクールダウンの取得中にエラーが発生しました: ${boothId}: ${error}`);
            return 0; // fallback to
        });
    }
    return await prisma.cooldown.create({
        data: {
            user_id: userId,
            booth_id: boothId,
            end_time: new Date(Date.now() + duration)
        }
    }).then((cooldown) => {
        return cooldown;
    });
}

async function getCooldown(userId: string, boothId: string) {
    return await prisma.cooldown.findFirst({
        where: {
            user_id: userId,
            booth_id: boothId
        }
    }).then((cooldown) => {
        return cooldown;
    });
}

async function canCheckin(userId: string, boothId: string) {
    return await prisma.cooldown.findFirst({
        where: {
            user_id: userId,
            booth_id: boothId,
            end_time: {
                gte: new Date()
            }
        }
    }).then((cooldown) => {
        return cooldown === null;
    });
}

export { setCooldown, getCooldown, canCheckin };
