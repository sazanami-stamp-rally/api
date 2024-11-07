import * as express from 'express'; // モジュールとして認識させるためのインポート

declare global {
    namespace Express {
        interface Request {
            headers: {
                userId: string;
            };
        }
    }
}

export { }; // モジュールとして認識させるためのエクスポート

