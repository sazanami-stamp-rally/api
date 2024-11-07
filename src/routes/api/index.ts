import { Router } from "express";
import userRouter from "@routes/api/user"
import debugRouter from "@routes/api/debug"
import checkinRouter from "@routes/api/checkin"

const router = Router();

router.use('/user', userRouter);
router.use('/checkin', checkinRouter);

// TODO: NODE_ENVを考慮してマウントする
router.use('/debug', debugRouter);

export default router;

