import mongoose from 'mongoose';

const activeCourseProgramSchema = new mongoose.Schema({
    courseId: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
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
                    isCompleted: {
                        type: Boolean,
                        default: false
                    },
                    deadline: {
                        type: Date,
                        default: null
                    }
                }
            ]
        }
    ],
    totalAmountOfTopics: Number,
    totalAmountOfProjects: Number,
    completedAt: Date
}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_, ret) => {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

export default mongoose.model('ActiveCourseProgram', activeCourseProgramSchema, 'activeCoursePrograms');