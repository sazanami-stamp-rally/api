import { Router, Request, Response } from 'express';
import Logger from '@src/logger';
import hasUserId from '@src/routes/middlewares/validation/hasUserId';
import { getHistory } from '@src/services/user/history';
import { HistoryItem } from '@src/models/history';
import { canCheckin } from '@src/services/cooldown';

const router = Router();

router.get('/', hasUserId, async (req: Request, res: Response) => {
  // hasUserIdミドルウェアを挟んでいる場合, req.userIdは存在することが保証されている
  getHistory(req.userId!).then((history) => {
    const historyData = history.map(async (checkin) => {
      const isFinished = await canCheckin(req.userId!, checkin.checkpoint_id);
      return {
        checkpointId: checkin.checkpoint_id,
        checkpointName: checkin.checkpoint.display_name,
        checkinTime: checkin.checkin_time,
        category: checkin.checkpoint.category,
        floor: checkin.checkpoint.floor,
        cooldown: {
          isFinished,
          remaining: isFinished ? null : (new Date().getTime() - checkin.checkin_time.getTime()) / 1000,
        },
      } as HistoryItem;
    });

    Promise.all(historyData).then((data) => {
      res.status(200).json(data);
    });
  });
});

export default router;
