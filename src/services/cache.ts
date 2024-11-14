import redis from "@src/ioredis";
import { getUserRanking } from "@src/services/ranking";
import Logger from "@src/logger";

const logger = new Logger();
logger.setTags(["service", "cache"]);

async function updateUserRankingCache() {
  getUserRanking().then((ranking) => {
    redis.set('user-ranking', JSON.stringify(ranking));
  });
}


async function getUserRankingCache() {
  const ranking = await redis.get('user-ranking');
  
  if (ranking === null) {
    logger.warn('ランキングキャッシュが存在しません');
    logger.info('ランキングキャッシュを再構築します');
    await updateUserRankingCache();
    logger.success('ランキングキャッシュの再構築が完了しました');
    return await getUserRankingCache();
  }

  return JSON.parse(ranking);
}


export { updateUserRankingCache, getUserRankingCache }
