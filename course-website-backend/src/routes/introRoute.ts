import express, { Request, Response } from 'express';
import Intro from '../models/introModel';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const url: string = req.query.url as string;

    try {
        let data;
        const intro = await Intro.findOne({ url: url }).lean();

        if (intro) {
            (intro as any).id = intro._id.toString();
            delete (intro as any)._id;
        }

        data = intro;
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
