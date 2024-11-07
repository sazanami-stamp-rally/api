import { Router } from "express";
import authController from "@routes/api/user/authRouter";


const router = Router();

router.use('/auth', authController);

export default router;
