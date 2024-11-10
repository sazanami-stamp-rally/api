import { Router } from "express";
import authRouter from "@routes/api/user/auth";
import profileRouter from "@routes/api/user/profile";
import historyRouter from "@routes/api/user/history";
import achievementRouter from "@routes/api/user/achievement";

const router = Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/history', historyRouter);
router.use('/achievement', achievementRouter);

export default router;
