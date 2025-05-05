import bcrypt from 'bcryptjs';

export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

export const comparePassword = (raw: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(raw, hashed);
};