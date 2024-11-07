// import { IncomingHttpHeaders } from "http";

declare module 'http' {
    interface IncomingHttpHeaders {
        userId?: string;
    }
}

export { }; // モジュールとして認識させるためのエクスポート

