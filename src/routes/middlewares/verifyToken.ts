import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtExpiredResponse, jwtVerifyErrorResponse, notPermittedResponse } from '@src/models/responses';

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers["authorization"];
    let token;
    if (authorizationHeader) {
        const token_ = authorizationHeader.split(" ")[1];
        if (token_) {
            token = token_;
        } else {
            return res.status(notPermittedResponse().statusCode).json(notPermittedResponse().body);
        }
    } else {
        return res.status(notPermittedResponse().statusCode).json(notPermittedResponse().body);
    }
    try {
        jsonwebtoken.verify(token, "secret"); // TODO: ハードコードやめる // TODO
        const decoded = jsonwebtoken.decode(token) as { [key: string]: string };
        // req.user = { token, claims: {
        //     sub: decoded["sub"],
        //     role: decoded["role"],
        //     home_group_id: decoded["home_group_id"]
        // }};
        next();
    } catch (error) {
        if (error instanceof jsonwebtoken.TokenExpiredError) {
            return res.status(jwtExpiredResponse().statusCode).json(jwtExpiredResponse().body);
        } else {
            return res.status(jwtVerifyErrorResponse().statusCode).json(jwtVerifyErrorResponse().body);
        }
    }
}
