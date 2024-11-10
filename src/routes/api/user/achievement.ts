import hasUserId from '@src/routes/middlewares/validation/hasUserId';
import { getAchievements } from '@src/services/user/achievement';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', hasUserId, async (req: Request, res: Response) => {
  await getAchievements(req.userId!).then((achievements) => {
    res.status(200).json(achievements);
  });
});

export default router;
