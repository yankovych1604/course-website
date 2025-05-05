import express from 'express';
import userRoute from './userRoute';
import userCoursesRoute from './userCoursesRoute';
import certificateRoute from './certificateRoute';
import activeCourseProgramRoute from './activeCourseProgramRoute';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use('/users', authMiddleware, userRoute);
router.use('/users-courses', authMiddleware, userCoursesRoute);
router.use('/certificates', authMiddleware, certificateRoute);
router.use('/active-course-program', authMiddleware, activeCourseProgramRoute);

export default router;
