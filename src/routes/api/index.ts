import { Router } from "express";
import userRouter from "@routes/api/user"
import debugRouter from "@routes/api/debug"
import checkinRouter from "@routes/api/checkin"
import broadcastRouter from "@routes/api/broadcast"
import commonRouter from "@routes/api/common"

const router = Router();

router.use('/user', userRouter);
router.use('/checkin', checkinRouter);
router.use('/broadcast', broadcastRouter);
router.use('/common', commonRouter);

// TODO: NODE_ENVを考慮してマウントする
router.use('/debug', debugRouter);

export default router;

