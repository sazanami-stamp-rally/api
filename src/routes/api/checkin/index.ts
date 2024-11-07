import { Router } from "express";
import Logger from '@src/logger';
import hasUserId from '@src/routes/middlewares/validation/hasUserId';
import { handleCheckin, isBoothIdExist } from "@src/services/checkin";
import { okResponse, notFoundResponse, internalServerErrorResponse } from "@src/models/responses";

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

    handleCheckin(req.userId!, boothId).then((checkin) => {
        logger.info(`ユーザー ${req.userId} がブース ${boothId} にチェックインしました`);
        const resp = okResponse();
        res.status(resp.statusCode).json(resp.body);
    }).catch((err) => {
        logger.error(err);
        const resp = internalServerErrorResponse();
        res.status(resp.statusCode).json(resp.body);
    });
});
