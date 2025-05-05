import express, { Request, Response } from 'express';
import CourseProgram from '../models/courseProgramModel';
import mongoose from "mongoose";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const courseId = req.query.courseId as string;

    try {
        let data;

        const objectId = new mongoose.Types.ObjectId(courseId);

        const courseProgram = await CourseProgram.findOne({ courseId: objectId }).lean();

        if (courseProgram) {
            (courseProgram as any).id = courseProgram._id.toString();
            delete  (courseProgram as any)._id;
        }

        data = courseProgram;
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;