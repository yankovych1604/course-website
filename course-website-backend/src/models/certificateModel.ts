import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ActiveCourseProgram',
        required: true
    },
    issuedAt: {
        type: Date,
        default: Date.now
    }
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

export default mongoose.model('Certificate', certificateSchema, 'certificates');