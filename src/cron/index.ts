import cron from 'node-cron';
import { updateUserRankingCache } from '@src/services/cache';
import { sweepExpiredCooldowns } from '@src/services/cooldown';
import Logger from '@src/logger';

const logger = new Logger();
logger.setTags(['cron']);

export default function startCronJobs() {
    // ユーザーランキングキャッシュ更新(毎分)
    cron.schedule('* * * * *', async () => {
        logger.info('ユーザーランキングキャッシュを更新しています...');
        updateUserRankingCache();
        logger.success('ユーザーランキングキャッシュを更新しました');
    });

    // 期限切れのクールダウンを削除(10分ごと)
    cron.schedule('* * * * *', async () => {
        logger.info('期限切れのクールダウンを削除しています...');
        sweepExpiredCooldowns();
        logger.success('期限切れのクールダウンを削除しました');
    });
}
