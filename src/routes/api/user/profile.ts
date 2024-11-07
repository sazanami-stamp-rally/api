import { Router, Request, Response } from 'express';
import Logger from '@src/logger';
import hasUserId from '@src/routes/middlewares/validation/hasUserId';
import { getUserDisplayName, setUserDisplayName } from '@src/services/user/profile';
import { internalServerErrorResponse, requiredFieldMissingResponse } from '@src/models/responses';

const router = Router();
const logger = new Logger();

logger.setTags(['api', 'user', 'profile']);

// ユーザー情報(現時点ではdisplay_nameのみ)を更新
router.post('/displayName', hasUserId, async (req: Request, res: Response) => {
    // hasUserIdミドルウェアを挟んでいる場合, req.userIdは存在することが保証されている
    if (!req.body.displayName) {
        const resp = requiredFieldMissingResponse(["displayName"])
        res.status(resp.statusCode).json(resp.body)
    }
    setUserDisplayName(req.userId!, req.body.displayName).then((user) => {
        logger.info(`ユーザー ${req.userId} がdisplay_nameを ${req.body.displayName} に変更しました`);
        res.status(200).json(user);
    }).catch((err) => {
        logger.error(err);
        const resp = internalServerErrorResponse();
        res.status(resp.statusCode).json(resp.body);
    });
});

router.get('/displayName', hasUserId, async (req: Request, res: Response) => {
    // hasUserIdミドルウェアを挟んでいる場合, req.userIdは存在することが保証されている
    getUserDisplayName(req.userId!).then((displayName) => {
        res.status(200).json({ displayName });
    }).catch((err) => {
        logger.error(err);
        const resp = internalServerErrorResponse();
        res.status(resp.statusCode).json(resp.body);
    });
})
