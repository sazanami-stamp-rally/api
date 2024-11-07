import { Router } from "express";
import authRouter from "@routes/api/user/auth";
import profileRouter from "@routes/api/user/profile";

const router = Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);

export default router;
