import express, { Request, Response } from 'express';
import Course from '../models/courseModel';

const router = express.Router();

const formatCourse = (course: any) => {
    const formatted = { ...course, id: course._id.toString() };

    delete formatted._id;
    delete formatted.__v;

    return formatted;
};

router.get('/', async (req: Request, res: Response) => {
    try {
        const courses = await Course.find({}).lean();

        const data = courses.map(formatCourse);

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id).lean();

        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }

        const courseObj = formatCourse(course);

        res.json(courseObj);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/url/:url', async (req: Request, res: Response) => {
    try {
        const course = await Course.findOne({ url: req.params.url }).lean();

        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }

        const courseObj = formatCourse(course);

        res.json(courseObj);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/category/:category', async (req: Request, res: Response) => {
    try {
        const category = req.params.category;

        const courses = await Course.find({ [category]: true }).lean();

        const data = courses.map(formatCourse);

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/courses-info', async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            res.status(400).json({ message: 'No course IDs provided' });
            return;
        }

        const courses = await Course.find({ _id: { $in: ids } }).lean();

        const courseMap = courses.reduce((map, course) => {
            const formatted = formatCourse(course);
            map.set(formatted.id, formatted);
            return map;
        }, new Map<string, any>());

        const orderedCourses = ids.map(id => courseMap.get(id)).filter(Boolean);

        res.json(orderedCourses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;