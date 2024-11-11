import { Router } from "express";
import Logger from '@src/logger';
import hasUserId from '@src/routes/middlewares/validation/hasUserId';
import { handleCheckin, isCheckpointIdExist } from "@src/services/checkin";
import { okResponse, notFoundResponse, internalServerErrorResponse } from "@src/models/responses";
import { canCheckin, setCooldown } from "@src/services/cooldown";

const router = Router();
const logger = new Logger();
logger.setTags(['api', 'checkin']);

router.post('/', hasUserId, async (req, res) => {
  // hasUserIdミドルウェアを挟んでいる場合, req.userIdは存在することが保証されている
  const checkpointId = req.body.checkpointId as string;
  if (!await isCheckpointIdExist(checkpointId)) {
    const resp = notFoundResponse();
    res.status(resp.statusCode).json(resp.body);
    return;
  }

  if (!await canCheckin(req.userId!, checkpointId)) {
    logger.info(`クールダウン中にチェックインが試行されました(UID: ${req.userId}, BID: ${checkpointId})`);
    res.status(403).json({
      message: 'クールダウンタイムが終了するまでは再度チェックインできません'
    });
    return;
  }

  handleCheckin(req.userId!, checkpointId)
    .then(async (earnedIds) => {
      await setCooldown(req.userId!, checkpointId);
      const resp = okResponse();
      res.status(resp.statusCode).json(earnedIds);
    })
    .catch((error) => {
      const resp = internalServerErrorResponse();
      res.status(resp.statusCode).json(resp.body);
      console.error(error.message);
    });

});

export default router;
