import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    selectedCourses: [
        {
            meta: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'courses',
            },
            program: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'activeCoursePrograms',
            }
        }
    ],
    certification: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Certificate'
        }
    ]
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

export default mongoose.model('User', userSchema, 'users');
