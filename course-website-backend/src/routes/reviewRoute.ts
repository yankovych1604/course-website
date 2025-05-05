import express, { Request, Response } from 'express';
import Review from '../models/reviewModel';
import Course from '../models/courseModel';

const router = express.Router();

function formatDate(date: Date): string {
    const currentDate = new Date(date);
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}.${month}.${year}`;
}

router.get('/grouped', async (req: Request, res: Response) => {
    try {
        const courses = await Course.find().lean();

        const courseIds = courses.map(course => course._id.toString());

        const reviews = await Review.find({ courseId: { $in: courseIds } })
            .populate('userId', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .lean();

        const grouped = courses.map(course => {
            const courseId = course._id.toString();
            const courseReviews = reviews
                .filter((review: any) => review.courseId.toString() === courseId)
                .map((review: any) => ({
                    id: review._id.toString(),
                    userId: review.userId._id.toString(),
                    firstName: review.userId.firstName,
                    lastName: review.userId.lastName,
                    email: review.userId.email,
                    courseId: review.courseId.toString(),
                    rating: parseFloat(review.rating.toFixed(1)),
                    description: review.description,
                    createdAt: review.createdAt,
                    dateFormatted: formatDate(review.createdAt),
                }));

            const avgRating = courseReviews.length ? courseReviews.reduce((sum, r) => sum + r.rating, 0) / courseReviews.length : 0;

            return {
                courseId,
                courseTitle: course.title,
                reviews: courseReviews,
                avgRating: parseFloat(avgRating.toFixed(1)),
                currentPage: 1,
                totalPages: Math.ceil(courseReviews.length / 3),
                paginatedReviews: courseReviews.slice(0, 3),
            };
        });

        res.json(grouped);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { userId, courseId, rating, description, createdAt } = req.body;

        const newReview = new Review({
            userId,
            courseId,
            rating,
            description,
            createdAt: createdAt ? new Date(createdAt) : new Date()
        });

        const saved = await newReview.save();

        res.json(saved);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
