import { Router, Request, Response } from 'express';
import Logger from '@src/logger';
import hasUserId from '@src/routes/middlewares/validation/hasUserId';
import { getAllowShowOnSignage, getAllowUseInBooth, getUserDisplayName, setUserAllowShowOnSignage, setUserAllowUseInBooth, setUserDisplayName } from '@src/services/user/profile';
import { internalServerErrorResponse, okResponse, requiredFieldMissingResponse } from '@src/models/responses';

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
    logger.info(`ユーザー ${req.userId} が表示名を ${user.display_name} に変更しました`);
    const resp = okResponse();
    res.status(resp.statusCode).json(resp.body);
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

// セキュリティフラグとかを設定
router.post('/flag', hasUserId, async (req: Request, res: Response) => {
  // hasUserIdミドルウェアを挟んでいる場合, req.userIdは存在することが保証されている
  if (!req.body.allowShowOnSignage && !req.body.allowUseInBooth) {
    const resp = requiredFieldMissingResponse(["allowShowOnSignage", "allowUseInBooth"]) // かなり嘘(どっちかでいいので)
    res.status(resp.statusCode).json(resp.body)
  }

  if (req.body.allowShowOnSignage) {
    setUserAllowShowOnSignage(req.userId!, req.body.allowShowOnSignage);
  }
  if (req.body.allowUseInBooth) {
    setUserAllowUseInBooth(req.userId!, req.body.allowUseInBooth);
  }
});

router.get('/flag', hasUserId, async (req: Request, res: Response) => {
  // hasUserIdミドルウェアを挟んでいる場合, req.userIdは存在することが保証されている
  // 全体的に見なかったことにしてる
  const allowShowOnSignage = await getAllowShowOnSignage(req.userId!);
  const allowUseInBooth = await getAllowUseInBooth(req.userId!);
  res.status(200).json({ allowShowOnSignage, allowUseInBooth });
});

export default router;
