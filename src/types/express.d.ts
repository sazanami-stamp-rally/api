import * as _express from 'express'; // モジュールとして認識させるためのインポート

declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}

export {}; // モジュールとして認識させるためのエクスポート
