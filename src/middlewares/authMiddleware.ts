import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json(errorResponse(null, 'Unauthorized'));
    }

    const token = authHeader?.split(' ')[1] || '';

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json(errorResponse(null, 'Invalid token'));
    }
};
