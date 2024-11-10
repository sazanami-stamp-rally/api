import prisma from '@src/prisma';
import Logger from '@src/logger';

const logger = new Logger();
logger.setTags(['service', 'cooldown']);

async function setCooldown(userId: string, checkpointId: string, duration?: number) {
  if (duration === undefined) {
    duration = await prisma.checkpoint.findUnique({
      where: {
        id: checkpointId
      }
    }).then((booth) => {
      if (booth === null) {
        logger.error(`チェックポイントの取得中にエラーが発生しました: ${checkpointId}`);
        return 0;
      }
      return booth.cooldown_duration;
    }).catch((error) => {
      logger.error(`デフォルトクールダウンの取得中にエラーが発生しました: ${checkpointId}: ${error}`);
      return 0; // fallback to
    });
  }
  return await prisma.cooldown.create({
    data: {
      user_id: userId,
      checkpoint_id: checkpointId,
      end_time: new Date(Date.now() + duration)
    }
  }).then((cooldown) => {
    return cooldown;
  });
}

async function getCooldown(userId: string, checkpointId: string) {
  return await prisma.cooldown.findFirst({
    where: {
      user_id: userId,
      checkpoint_id: checkpointId,
    }
  }).then((cooldown) => {
    return cooldown;
  });
}

async function canCheckin(userId: string, checkpointId: string) {
  return await prisma.cooldown.findFirst({
    where: {
      user_id: userId,
      checkpoint_id: checkpointId,
      end_time: {
        gte: new Date()
      }
    }
  }).then((cooldown) => {
    return cooldown === null;
  });
}

async function sweepExpiredCooldowns() {
  return await prisma.cooldown.deleteMany({
    where: {
      end_time: {
        lt: new Date()
      }
    }
  }).then((result) => {
    return result;
  });
}

async function clearCooldown(userId: string, checkpointId: string) {
  return await prisma.cooldown.deleteMany({
    where: {
      user_id: userId,
      checkpoint_id: checkpointId
    }
  }).then((result) => {
    return result;
  });
}

async function clearCooldownsByUser(userId: string) {
  return await prisma.cooldown.deleteMany({
    where: {
      user_id: userId
    }
  }).then((result) => {
    return result;
  });
}

async function clearCooldownsByCheckpoint(checkpointId: string) {
  return await prisma.cooldown.deleteMany({
    where: {
      checkpoint_id: checkpointId
    }
  }).then((result) => {
    return result;
  });
}

export { setCooldown, getCooldown, canCheckin, sweepExpiredCooldowns, clearCooldown, clearCooldownsByUser, clearCooldownsByCheckpoint };
