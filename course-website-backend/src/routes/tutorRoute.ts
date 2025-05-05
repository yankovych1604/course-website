import express, { Request, Response } from 'express';
import Tutor from '../models/tutorModel';
import mongoose from "mongoose";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const tutorId: string = req.query.id as string;

    try {
        let data;

        if (tutorId) {
            const objectId = new mongoose.Types.ObjectId(tutorId);
            const tutor = await Tutor.findOne({ _id: objectId }).lean();

            if (tutor) {
                (tutor as any).id = tutor._id.toString();
                delete  (tutor as any)._id;
            }

            data = tutor;
        } else {
            const tutors = await Tutor.find({}).lean();

            data = tutors.map((tutor: any) => {
                tutor.id = tutor._id.toString();
                delete tutor._id;
                return tutor;
            });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;