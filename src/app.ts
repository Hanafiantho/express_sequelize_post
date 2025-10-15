import express from 'express';

import authRoutes from './routes/authRoutes';
import commentRoutes from './routes/commentRoutes';
import postRouter from './routes/postRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRouter);
app.use('/comments', commentRoutes);
app.use('/auth', authRoutes);

export default app;
