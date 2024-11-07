import cron from 'node-cron';
import { updateUserRankingCache } from '@src/services/cache';

// ユーザーランキングキャッシュ更新(毎分)
cron.schedule('* * * * *', async () => {
    updateUserRankingCache();
});


