import { Router } from "express";
import authRouter from "@routes/api/user/auth";

const router = Router();

router.use('/auth', authRouter);

export default router;
