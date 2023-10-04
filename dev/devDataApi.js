const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../src/models/tour.js');

dotenv.config({ path: './config.env' });

// const connectionString = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD,
// );

mongoose
  .connect(process.env.DOCKER_DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connection successful!'));

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, './toursSimple.json'), 'utf-8'),
);

const importDevDataIntoDb = async () => {
  console.log(Tour);
  try {
    await Tour.create(tours);
    console.log('Data sucessfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

const flushDevDataFromDb = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data sucessfully flushed!');
  } catch (err) {
    console.log(err);
  }
};

module.exports = { importDevDataIntoDb, flushDevDataFromDb };
