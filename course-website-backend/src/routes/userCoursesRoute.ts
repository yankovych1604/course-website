import express from 'express';
import Course from '../models/courseModel';
import ActiveCourseProgram from '../models/activeCourseProgramModel';
import mongoose from 'mongoose';

const router = express.Router();

function formatDate(date: Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
}

function formatCourse(course: any) {
    const { _id, __v, ...rest } = course;
    return {
        ...rest,
        id: _id.toString()
    };
}

function formatProgram(program: any) {
    const formattedModules = program.modules.map((module: any) => ({
        ...module,
        topics: module.topics.map((topic: any) => ({
            ...topic,
            deadline: formatDate(new Date(topic.deadline))
        }))
    }));

    const { _id, __v, ...rest } = program;

    return {
        ...rest,
        id: _id.toString(),
        modules: formattedModules,
        completedAt: program.completedAt ? formatDate(new Date(program.completedAt)) : null
    };
}

router.post('/courses-data', async (req, res) => {
    try {
        const { metaIds, programIds } = req.body;

        if (!metaIds || !programIds) {
            res.status(400).json({ message: 'Missing metaIds or programIds' });
            return;
        }

        const metas = await Course.find({ _id: { $in: metaIds.map((id: string) => new mongoose.Types.ObjectId(id)) } }).lean();
        const programs = await ActiveCourseProgram.find({ _id: { $in: programIds.map((id: string) => new mongoose.Types.ObjectId(id)) } }).lean();

        const formattedMetas = metas.map(formatCourse);
        const formattedPrograms = programs.map(formatProgram);

        const metaMap = new Map(formattedMetas.map(meta => [meta.id, meta]));
        const programMap = new Map(formattedPrograms.map(program => [program.id, program]));

        const combinedData = metaIds.map((metaId: string, index: number) => {
            const programId = programIds[index];
            const meta = metaMap.get(metaId);
            const program = programMap.get(programId);

            return { meta, program };
        });

        res.json(combinedData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
