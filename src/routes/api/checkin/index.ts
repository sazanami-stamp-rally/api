import { Router } from "express";
import Logger from '@src/logger';
import hasUserId from '@src/routes/middlewares/validation/hasUserId';
import { handleCheckin, isBoothIdExist } from "@src/services/checkin";
import { okResponse, notFoundResponse, internalServerErrorResponse } from "@src/models/responses";
import { canCheckin, setCooldown } from "@src/services/cooldown";

const router = Router();
const logger = new Logger();
logger.setTags(['api', 'checkin']);

router.post('/:boothId', hasUserId, async (req, res) => {
    // hasUserIdミドルウェアを挟んでいる場合, req.userIdは存在することが保証されている
    const boothId = req.params.boothId;
    if (!isBoothIdExist(boothId)) {
        const resp = notFoundResponse();
        res.status(resp.statusCode).json(resp.body);
        return;
    }

    if (!await canCheckin(req.userId!, boothId)) {
        logger.info(`クールダウン中のチェックインが試行されました(UID: ${req.userId}, BID: ${boothId})`);
        res.status(403).json({
            message: 'クールダウンタイムが終了するまでは再度チェックインできません'
        });
        return;
    }

    handleCheckin(req.userId!, boothId).then((checkin) => {
        setCooldown(req.userId!, boothId).then(() => {
        logger.info(`ユーザー "${checkin.user.display_name}" がブース "${checkin.booth.display_name}" (${checkin.booth.floor}階) にチェックインしました`);
        const resp = okResponse();
        res.status(resp.statusCode).json(resp.body);
        }).catch((err) => {
            logger.error(err);
            const resp = internalServerErrorResponse();
            res.status(resp.statusCode).json(resp.body);
        });
    }).catch((err) => {
        logger.error(err);
        const resp = internalServerErrorResponse();
        res.status(resp.statusCode).json(resp.body);
    });
});

export default router;
