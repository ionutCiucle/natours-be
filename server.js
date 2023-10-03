const dotenv = require('dotenv');
const mongoose = require('mongoose');

// We need to set the env variables before importing "app"
dotenv.config({ path: './config.env' });

const app = require('./src/app.js');

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
