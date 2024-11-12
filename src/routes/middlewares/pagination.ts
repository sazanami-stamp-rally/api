import { Request, Response, NextFunction } from 'express';

export default function parsePagination(req: Request, _res: Response, next: NextFunction) {
  if (!(req.query.page || req.query.from) && req.query.limit) {
    req.pagination = undefined;
    next();
  }

  const page = parseInt(req.query.page as string, 10) || -1;
  const from = req.query.from as string;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  req.pagination = { page, from, limit };

  next();
}
