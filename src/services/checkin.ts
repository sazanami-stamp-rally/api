import prisma from '@src/prisma';
import Logger from '@src/logger';
import { processCheckinAchievement } from './achivement';

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
  }).then(() => {
    logger.info(`User ${userId} checked in at checkpoint ${checkpointId}`);
  }).then(async () => {
    return await processCheckinAchievement(userId, checkpointId);
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
