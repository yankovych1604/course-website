import dotenv from 'dotenv';

dotenv.config();

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import publicRoutes from './routes/publicRoutes';
import protectedRoutes from './routes/protectedRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URL || '';

app.use(cors());
app.use(express.json());

app.use('/api', protectedRoutes);
app.use('/public-api', publicRoutes);

console.log('📦 Starting backend...');
console.log('🔗 MONGO_URL:', MONGO_URI);

app.get('/', (req, res) => {
    res.send('✅ Backend is working!');
});

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.error(error));
