import express, { Request, Response } from 'express';
import ActiveCourseProgram from '../models/activeCourseProgramModel';

const router = express.Router();

function formatDate(date: Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
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
        id: _id?.toString(),
        modules: formattedModules,
        completedAt: program.completedAt ? formatDate(new Date(program.completedAt)) : null
    };
}

router.post('/', async (req: Request, res: Response) => {
    try {
        const {
            courseId,
            modules,
            totalAmountOfTopics,
            totalAmountOfProjects
        } = req.body;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 1);
        let currentDeadline = new Date(startDate);

        const processedModules = modules.map((module: any) => ({
            ...module,
            topics: module.topics.map((topic: any) => {
                const deadline = new Date(currentDeadline);
                deadline.setHours(23, 59, 59, 999);

                const processedTopic = {
                    ...topic,
                    isCompleted: false,
                    deadline: deadline
                };
                currentDeadline.setDate(currentDeadline.getDate() + 2);
                return processedTopic;
            })
        }));

        const newProgram = await ActiveCourseProgram.create({
            courseId,
            modules: processedModules,
            totalAmountOfTopics,
            totalAmountOfProjects,
            completedAt: null
        });

        res.json(formatProgram(newProgram.toObject()));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});


router.get('/:id/period/:period', async (req: Request, res: Response) => {
    try {
        const { id, period } = req.params;

        const program = await ActiveCourseProgram.findById(id).lean();

        if (!program) {
            res.status(404).json({ message: 'Program not found' });
            return;
        }

        const days = parseInt(period.replace('-days', ''), 10);
        if (isNaN(days)) {
            res.status(400).json({ message: 'Invalid period format' });
            return;
        }

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setDate(now.getDate() + days);
        end.setHours(23, 59, 59, 999);

        const topicsInPeriod: any[] = [];

        let moduleIndex = 0;
        do {
            const module = program.modules[moduleIndex];
            let topicIndex = 0;
            do {
                const topic = module.topics[topicIndex];
                const deadline = new Date(topic.deadline);
                const isInRange = deadline >= now && deadline <= end;

                if (!topic.isCompleted && isInRange) {
                    const formattedDeadline = formatDate(deadline);

                    topicsInPeriod.push({
                        ...topic,
                        deadline: formattedDeadline,
                    });
                }

                topicIndex++;
            } while (topicIndex < module.topics.length);

            moduleIndex++;
        } while (moduleIndex < program.modules.length);

        res.json(topicsInPeriod);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.patch('/:programId/topic/:topicId/complete', async (req: Request, res: Response) => {
    try {
        const { programId, topicId } = req.params;

        const program = await ActiveCourseProgram.findById(programId);
        if (!program) {
            res.status(404).json({ message: 'Program not found' });
            return;
        }

        for (const module of program.modules) {
            const topic = module.topics.find(t => t.topicId === topicId);
            if (topic) {
                topic.isCompleted = true;
                break;
            } else {
            }
        }

        await program.save();

        const updatedProgram = await ActiveCourseProgram.findById(programId).lean();
        if (!updatedProgram) {
            res.status(500).json({ message: 'Failed to reload updated program' });
            return;
        }

        res.json(formatProgram(program));
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.patch('/:programId/complete', async (req, res) => {
    try {
        const { programId } = req.params;

        const program = await ActiveCourseProgram.findByIdAndUpdate(
            programId,
            { completedAt: new Date() },
            { new: true }
        );

        if (!program) {
            res.status(404).json({ message: 'Program not found' });
            return;
        }

        res.json(formatProgram(program));
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;