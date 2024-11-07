import { Request, Response, NextFunction } from 'express';

export default function hasUserId(req: Request, res: Response, next: NextFunction) {
    if (req.headers.userId && typeof req.headers.userId === 'string') {
        next();
    } else {
        res.status(400).json({ message: 'Missing or invalid user id' });
    }
}
