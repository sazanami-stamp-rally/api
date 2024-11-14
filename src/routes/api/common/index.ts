import { Router } from "express";
import rankingRouter from "./ranking";


const router = Router();

router.use('/ranking', rankingRouter);

export default router;
