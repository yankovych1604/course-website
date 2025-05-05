import { Request, Response } from 'express';
import User from '../models/userModel';
import { hashPassword } from '../services/hashService';
import { generateToken } from '../services/tokenService';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashed = await hashPassword(password);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            phone,
            password: hashed,
            selectedCourses: [],
            certification: []
        });

        const token = generateToken(newUser._id.toString());

        res.status(201).json({
            token: token,
            user: {
                id: newUser._id,
                firstName,
                lastName,
                email,
                phone,
                selectedCourses: [],
                certification: [],
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
};
