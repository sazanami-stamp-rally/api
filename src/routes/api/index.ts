import { Router } from "express";
import userRouter from "@routes/api/user"

const router = Router();

router.use('/user', userRouter);

export default router;

