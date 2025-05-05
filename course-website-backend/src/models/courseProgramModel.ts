import mongoose from 'mongoose';

const courseProgramSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    modules: [
        {
            moduleId: String,
            title: String,
            description: String,
            countOfTopics: Number,
            topics: [
                {
                    topicId: String,
                    title: String,
                }
            ]
        }
    ],
    totalAmountOfTopics: Number,
    totalAmountOfProjects: Number
});

export default mongoose.model('CourseProgram', courseProgramSchema, 'coursePrograms');