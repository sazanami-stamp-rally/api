import prisma from "@src/prisma";

async function getAchievements(userId: string) {
  return prisma.achievement.findMany({
    where: {
      user_id: userId
    }
  });
}

export { getAchievements };
