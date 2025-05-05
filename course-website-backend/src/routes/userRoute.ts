import express, { Request, Response } from 'express';
import User from '../models/userModel';
import mongoose from "mongoose";

const router = express.Router();

function formatUser(userDoc: any) {
    const user = userDoc.toJSON ? userDoc.toJSON() : userDoc;

    if (user._id) {
        user.id = user._id.toString();
        delete user._id;
    } else if (user.id) {
        user.id = user.id.toString(); // якщо вже є id
    }

    delete user.__v;

    if (Array.isArray(user.selectedCourses)) {
        user.selectedCourses = user.selectedCourses.map((course: any) => ({
            id: course.id || course._id?.toString(),
            meta: course.meta?.toString(),
            program: course.program?.toString(),
        }));
    }

    if (Array.isArray(user.certification)) {
        user.certification = user.certification.map((certificateId: any) => certificateId.toString());
    }

    return user;
}

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid or missing user ID' });
            return;
        }

        const user = await User.findById(id).select('-password')
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const formattedUser = formatUser(user);

        res.json(formattedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid or missing user ID' });
            return;
        }

        const { firstName, lastName, email, phone } = req.body;

        const updatedFields: any = {};
        if (firstName) updatedFields.firstName = firstName;
        if (lastName) updatedFields.lastName = lastName;
        if (email) updatedFields.email = email;
        if (phone) updatedFields.phone = phone;

        const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const formattedUser = formatUser(updatedUser);

        res.json(formattedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.patch('/:id/add-course', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Missing user ID' });
            return;
        }

        const { courseId, programId } = req.body;
        if (!courseId || !programId) {
            res.status(400).json({ message: 'Missing courseId or programId' });
            return;
        }


        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.selectedCourses.push({
            meta: new mongoose.Types.ObjectId(courseId),
            program: new mongoose.Types.ObjectId(programId),
        });


        const updatedUser = await user.save();

        const formattedUser = formatUser(updatedUser);

        res.json(formattedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.patch('/:id/add-certificate', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Missing user ID' });
            return;
        }

        const { certificateId } = req.body;
        if (!certificateId) {
            res.status(400).json({ message: 'Certificate ID is required' });
            return;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $addToSet: { certification: certificateId } },
            { new: true, runValidators: true }
        )

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const formattedUser = formatUser(updatedUser);

        res.json(formattedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;