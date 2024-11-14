import { Router } from "express";
import Logger from '@src/logger';
import { getUserRankingCache } from "@src/services/cache";

const router = Router();
const logger = new Logger();
logger.setTags(['route', 'api', 'common', 'ranking']);

router.get('/', (req, res) => {
  getUserRankingCache().then((ranking) => {
    res.status(200).json(ranking);
  });
})

export default router;
