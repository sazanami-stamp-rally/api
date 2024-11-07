import { Router, Request, Response } from 'express';
import Logger from '@src/logger';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    res.send('WIP');
});

export default router;
