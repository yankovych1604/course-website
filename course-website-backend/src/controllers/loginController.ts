import { Request, Response } from 'express';
import User from '../models/userModel';
import { comparePassword } from '../services/hashService';
import { generateToken } from '../services/tokenService';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email })

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }

        const token = generateToken(user._id.toString());

        res.json({
            token: token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                selectedCourses: user.selectedCourses,
                certification: user.certification
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};
