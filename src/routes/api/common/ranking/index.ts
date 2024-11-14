import { Router } from "express";
import Logger from '@src/logger';

const router = Router();
const logger = new Logger();
logger.setTags(['route', 'api', 'common', 'ranking']);

router.get('/', (req, res) => {
    res.json({
        message: 'ranking'
    });
})
