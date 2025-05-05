import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    duration: Number,
    url: String,
    title: String,
    difficulty_level: String,
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor' },
    description: String,
    new: Boolean,
    popular: Boolean,
    coded: Boolean,
    nocoded: Boolean,
    image: String,
});

export default mongoose.model('Course', courseSchema, 'courses');