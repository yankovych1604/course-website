import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/tokenService';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization header missing or malformed' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        (req as any).userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};