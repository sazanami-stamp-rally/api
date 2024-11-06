// responseTypes.ts
export interface ResponseBody {
    message: string;
}

export interface MessageResponse {
    statusCode: number;
    body: ResponseBody;
}
