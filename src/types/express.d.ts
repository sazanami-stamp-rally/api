import * as _express from 'express'; // モジュールとして認識させるためのインポート

declare global {
  namespace Express {
    interface Request {
      userId?: string
      pagination?: {
        page?: number
        from?: string
        limit: number
      }
    }
  }
}

export {}; // モジュールとして認識させるためのエクスポート
