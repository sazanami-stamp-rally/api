import express from 'express';
import Logger from './logger';
// import prisma from '@src/prisma';
import cors from 'cors';

// Init
const app = express();
const DEFAULT_PORT = 3000;

const logger = new Logger();
logger.setTag('index');

// Startup
logger.info("サーバーを起動しています...");

const configLogger = logger.getChild('config');
// Config
const port = process.env.PORT || DEFAULT_PORT;

// Init server
app.use(express.json());
configLogger.info('Express JSON parserを有効にしました');

// For debug only
const corsOptions = {
    origin: '*',
    methos: "GET, POST, PUT, DELETE, OPTIONS",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
configLogger.warn('全オリジンからのリクエストを許可しました !!for debug only!!');

logger.success('Expressサーバーの初期化が完了しました');

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    logger.success(`サーバーが起動しました。使用ポート: ${port}`);
});

