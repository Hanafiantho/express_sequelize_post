import express from 'express';

import commentRoutes from './routes/commentRoutes';
import postRouter from './routes/postRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRouter);
app.use('/comments', commentRoutes);

export default app;
