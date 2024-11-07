import prisma from '@src/prisma';
import Logger from '@src/logger';

const logger = new Logger();
logger.setTags(['service', 'checkin']);

async function handleCheckin(userId: string, boothId: string) {
    return await prisma.checkin.create({
        data: {
            user_id: userId,
            booth_id: boothId
        }, include: { // ログをきれいにするのが主目的なので負荷になるなら消してもいいかも
            booth: true,
            user: true
        }
    }).then((checkin) => {
        return checkin;
    });
}

async function isBoothIdExist(boothId: string) {
    return await prisma.booth.findUnique({
        where: {
            id: boothId
        }
    }).then((booth) => {
        return booth !== null;
    });
}

export { handleCheckin, isBoothIdExist };
