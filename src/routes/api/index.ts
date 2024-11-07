import { Router } from "express";
import userRouter from "@routes/api/user"
import debugRouter from "@routes/api/debug"

const router = Router();

router.use('/user', userRouter);

// TODO: NODE_ENVを考慮してマウントする
router.use('/debug', debugRouter);

export default router;

