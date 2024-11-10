import prisma from "@src/prisma";

async function getHistory(userId: string) {
  return prisma.checkin.findMany({
    where: {
      user_id: userId
    },
    include: {
      checkpoint: true,
    },
    orderBy: {
      checkin_time: 'desc'
    },
  });
}

export { getHistory };
