import { MessageResponse } from "@src/types/messageResponse";


const requiredFieldMissingResponse = (field: string[]): MessageResponse => {
    return {
        statusCode: 400,
        body: {
            message: `必須フィールドが不足しています: ${field.join(', ')}`,
        },
    };
}

const jwtVerifyErrorResponse = (): MessageResponse => {
    return {
        statusCode: 401,
        body: {
            message: 'JWTの署名検証に失敗しました',
        },
    };
}

const jwtExpiredResponse = (): MessageResponse => {
    return {
        statusCode: 401,
        body: {
            message: 'JWTの有効期限が切れています',
        },
    };
}

const JwtRequiredClaimsMissingResponse = (claims: string[]): MessageResponse => {
    return {
        statusCode: 401,
        body: {
            message: '必要なクレームが不足しています: ' + claims.join(', '),
        },
    };
}

const requestBodyEmptyResponse = (): MessageResponse => {
    return {
        statusCode: 400,
        body: {
            message: 'リクエストボディが空です',
        },
    };
}

const notPermittedResponse = (): MessageResponse => {
    return {
        statusCode: 403,
        body: {
            message: '許可されていない操作です',
        },
    };
}

const notFoundResponse = (): MessageResponse => {
    return {
        statusCode: 404,
        body: {
            message: 'リソースが見つかりません',
        },
    };
}

const internalServerErrorResponse = (): MessageResponse => {
    return {
        statusCode: 500,
        body: {
            message: 'サーバ内部でエラーが発生しました',
        },
    };
}

const badRequestResponse = (): MessageResponse => {
    return {
        statusCode: 400,
        body: {
            message: 'リクエストが不正です',
        },
    };
}

const okResponse = (): MessageResponse => {
    return {
        statusCode: 200,
        body: {
            message: 'OK',
        },
    };
}

export { 
    requiredFieldMissingResponse,
    jwtVerifyErrorResponse,
    jwtExpiredResponse,
    JwtRequiredClaimsMissingResponse, 
    requestBodyEmptyResponse, 
    notPermittedResponse, 
    notFoundResponse, 
    internalServerErrorResponse, 
    badRequestResponse, 
    okResponse 
}
