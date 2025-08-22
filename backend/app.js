import express from 'express';
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

dotenv.config();

app.use(express.json());

app.use('/api/auth',authRoutes); 
app.use('/api/user',userRoutes);
export default app;