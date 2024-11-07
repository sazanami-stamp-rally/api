import redis from "@src/ioredis";
import { getUserRanking } from "@src/services/ranking";

async function updateUserRankingCache() {
    getUserRanking().then((ranking) => {
        redis.set('user-ranking', JSON.stringify(ranking));
    });
}

export { updateUserRankingCache };
