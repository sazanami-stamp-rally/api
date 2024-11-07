import { Request, Response, NextFunction } from 'express';

export default function hasUserId(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
        const userId = req.headers.authorization.split(' ')[1];
        if (userId) {
            req.userId = userId;
            next();
        } else {
            res.status(400).json({ message: 'Missing or invalid user id' });
        }
    } else {
        res.status(400).json({ message: 'Missing or invalid user id' });
    }
}
