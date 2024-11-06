import express from 'express';
import Logger from './logger';
import prisma from '@src/prisma';
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

// Try to connect to the database
// connect db
const dbLogger = logger.getChild('db');
dbLogger.info("データベースへの接続を試みます...");
try {
    await prisma.$connect();
    // get db version with raw query
    const result = await prisma.$queryRaw`SELECT version()` as [{ version: string }];
    dbLogger.success("接続成功: " + result[0].version.split(" ").slice(0, 2).join(" "))
    dbLogger.debug("raw: " + JSON.stringify(result));
} catch (e) {
    dbLogger.error("Failed to connect to database");
    dbLogger.debug("Error: " + e);
    process.exit(1);
}


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

