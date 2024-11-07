import cron from 'node-cron';
import { updateUserRankingCache } from '@src/services/cache';
import { sweepExpiredCooldowns } from '@src/services/cooldown';

export default function startCronJobs() {
    // ユーザーランキングキャッシュ更新(毎分)
    cron.schedule('* * * * *', async () => {
        updateUserRankingCache();
    });

    // 期限切れのクールダウンを削除(10分ごと)
    cron.schedule('*/10 * * * *', async () => {
        sweepExpiredCooldowns();
    });
}
