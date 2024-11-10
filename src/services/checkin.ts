import prisma from '@src/prisma';
import Logger from '@src/logger';

const logger = new Logger();
logger.setTags(['service', 'checkin']);

async function handleCheckin(userId: string, checkpointId: string) {
  return await prisma.checkin.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      checkpoint: {
        connect: {
          id: checkpointId
        }
      }
    }
  }).then((checkin) => {
    logger.info(`User ${userId} checked in at checkpoint ${checkpointId}`);
    return checkin;
  });
}

async function isCheckpointIdExist(checkpointId: string) {
  return await prisma.checkpoint.findFirst({
    where: {
      id: checkpointId
    }
  }).then((checkpoint) => {
    return checkpoint !== null;
  });
}

export { handleCheckin, isCheckpointIdExist };
