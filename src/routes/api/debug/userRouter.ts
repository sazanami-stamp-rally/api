import { Router, Request, Response } from 'express';
import Logger from '@src/logger';
import prisma from '@src/prisma';

const router = Router();
const logger = new Logger();
logger.setTags(['api', 'debug', 'user']);

router.post('/register', async (req: Request, res: Response) => {
    prisma.user.create({
        data: {
            display_name: null // なぜか空で挿入できないので
        }
    }).then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        logger.error(err);
        res.status(500).json({ error: err });
    });
});


export default router;
