import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import Tour from '../src/models/tour.js';

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

const tours = JSON.parse(
  fs.readFileSync(
    path.join(
      // eslint-disable-next-line
      path.dirname(fileURLToPath(import.meta.url)),
      './toursSimple.json',
    ),
    'utf-8',
  ),
);

export const importDevDataIntoDb = async () => {
  try {
    await Tour.create(tours);
    console.log('Data sucessfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

export const flushDevDataFromDb = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data sucessfully flushed!');
  } catch (err) {
    console.log(err);
  }
};
