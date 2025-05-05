import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

export const generateToken = (userId: string): string => {
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: '24h',
    });
};

export const verifyToken = (token: string): { id: string } => {
    try {
        return jwt.verify(token, JWT_SECRET) as { id: string };
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};
