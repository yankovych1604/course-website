import mongoose from 'mongoose';

const introSchema = new mongoose.Schema({
    url: String,
    isCourse: Boolean,
    title: String,
    subtitle: String,
    description: String,
    headingImage: String,
    introImage: String,
});

export default mongoose.model('Intro', introSchema, 'intros');