import redis from "@src/ioredis";
import { getUserRanking } from "@src/services/ranking";

async function updateUserRankingCache() {
  getUserRanking().then((ranking) => {
    redis.set('user-ranking', JSON.stringify(ranking));
  });
}


async function getUserRankingCache() {
  const ranking = await redis.get('user-ranking');
  
  if (ranking === null) {
    await updateUserRankingCache();
    return await getUserRankingCache();
  }

  return JSON.parse(ranking);
}


export { updateUserRankingCache, getUserRankingCache }
