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

async function setUserAllowShowOnSignage(userId: string, allowShowOnSignage: boolean) {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      allow_show_on_signage: allowShowOnSignage
    }
  }).then((user) => {
    return user;
  });
}

async function setUserAllowUseInBooth(userId: string, allowUseInBooth: boolean) {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      allow_use_in_booth: allowUseInBooth
    }
  }).then((user) => {
    return user;
  });
}

async function getAllowShowOnSignage(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  }).then((user) => {
    return user?.allow_show_on_signage
  });
}

async function getAllowUseInBooth(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  }).then((user) => {
    return user?.allow_use_in_booth
  });
}

export { setUserDisplayName, getUserDisplayName, setUserAllowShowOnSignage, setUserAllowUseInBooth, getAllowShowOnSignage, getAllowUseInBooth };
