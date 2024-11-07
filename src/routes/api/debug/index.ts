import { Router } from "express";
import userRouter from "./userRouter";
import boothRouter from "./booth";

const router = Router();

router.use("/user", userRouter);
router.use("/booth", boothRouter);

export default router;
