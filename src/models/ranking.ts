interface RankingBaseItem {
    rank: number;
    score: number;
}

interface UserRankingBaseItem extends RankingBaseItem {
    userId: string;
    userName: string;
}

interface UserRankingItem extends UserRankingBaseItem {
    // additional fields
}

interface BoothRankingBaseItem extends RankingBaseItem {
    boothId: string;
    boothName: string;
}

interface BoothRankingItem extends BoothRankingBaseItem {
    // additional fields
}

export { UserRankingItem, BoothRankingItem };

