import { Router, Request, Response } from 'express';
import Logger from '@src/logger';
import { checkActivated } from '@src/services/user/auth';
import hasUserId from '@src/routes/middlewares/validation/hasUserId';

const router = Router();

router.get('/isActivated', hasUserId, async (req: Request, res: Response) => {
    // hasUserIdミドルウェアでuserIdがあることが保証されている
    checkActivated(req.headers.userId as string).then((isActivated) => {
        res.status(200).json({ isActivated });
    });
});

router.get('/activate', hasUserId, async (req: Request, res: Response) => {
    checkActivated(req.headers.userId as string).then((isActivated) => {
        if (isActivated) {
            res.status(400).json({ message: 'User is already activated' });
        } else {
            res.status(200).json({ message: 'Successfully activated' });
        }
    });
});

export default router;
