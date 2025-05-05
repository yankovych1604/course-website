import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
    fullName: String,
    description: Boolean,
    image: String,
});

export default mongoose.model('Tutor', tutorSchema, 'tutors');