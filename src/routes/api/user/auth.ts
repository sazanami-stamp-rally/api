import { Router, Request, Response } from 'express';
import Logger from '@src/logger';
import { activateUser, checkActivated } from '@src/services/user/auth';
import hasUserId from '@src/routes/middlewares/validation/hasUserId';

const router = Router();

router.get('/isActivated', hasUserId, async (req: Request, res: Response) => {
    // hasUserIdミドルウェアを挟んでいる場合, req.userIdは存在することが保証されている
    checkActivated(req.userId!).then((isActivated) => {
        res.status(200).json({ isActivated });
    });
});

router.post('/activate', hasUserId, async (req: Request, res: Response) => {
    // hasUserIdミドルウェアを挟んでいる場合, req.userIdは存在することが保証されている
    checkActivated(req.userId!).then((isActivated) => {
        if (isActivated) {
            res.status(400).json({ message: 'User is already activated' });
        } else {
            activateUser(req.userId!).then(() => {
                res.status(200).json({ message: 'Successfully activated' });
            });
        }
    });
});

export default router;
