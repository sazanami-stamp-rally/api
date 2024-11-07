import { Router, Request, Response } from 'express';
import Logger from '@src/logger';
import prisma from '@src/prisma';

const router = Router();
const logger = new Logger();
logger.setTags(['api', 'debug', 'booth']);

router.post('/register', async (req: Request, res: Response) => {
    const display_name = req.body.displayName;
    const floor = req.body.floor;
    const category = req.body.category;
    const booth = await prisma.booth.create({
        data: {
            display_name,
            floor,
            category
        }
    });
    res.json(booth);
});

export default router;
