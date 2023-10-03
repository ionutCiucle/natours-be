import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './src/app.js';

dotenv.config({ path: './config.env' });

const connectionString = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connection successful!'));

app.listen(process.env.PORT, () => {
  console.log(
    `[${process.env.NODE_ENV}] App listening on port ${process.env.PORT}`,
  );
});
