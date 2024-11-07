import prisma from '@src/prisma';
import Logger from '@src/logger';
import { UserRankingItem } from '@src/models/ranking';

const logger = new Logger();
logger.setTags(['service', 'ranking']);

// 通常のランキング
async function getUserRanking() {
    try {
        const users = await prisma.user.findMany({
            include: {
                _count: {
                    select: { Checkin: true }
                }
            },
            orderBy: {
                Checkin: {
                    _count: 'desc'
                }
            }
        });

        // ユーザーランキングの詰替処理と順位の計算
        const ranking: UserRankingItem[] = [];
        let currentRank = 1;

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const previousUser = i > 0 ? users[i - 1] : null;

            // 同じチェックイン数であれば同順位にする
            if (previousUser && user._count?.Checkin === previousUser._count?.Checkin) {
                ranking.push({
                    rank: ranking[i - 1].rank, // 前のユーザーと同じ順位
                    userId: user.id,
                    userName: user.display_name || 'Unknown',
                    score: user._count?.Checkin || 0
                });
            } else {
                ranking.push({
                    rank: currentRank,
                    userId: user.id,
                    userName: user.display_name || 'Unknown',
                    score: user._count?.Checkin || 0
                });
            }

            // 順位を次に進める
            currentRank = ranking[i].rank + 1;
        }
        return ranking;
    } catch (error) {
        throw error;
    }
}

// TODO: 複雑な要件を持つランキングを算出できるようにする
