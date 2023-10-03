import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tour.js';
import userRouter from './routes/user.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
