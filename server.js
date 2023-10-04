const dotenv = require('dotenv');
const mongoose = require('mongoose');

// We need to set the env variables before importing "app"
dotenv.config({ path: './config.env' });

const app = require('./src/app.js');

const dockerConnectionString = process.env.DOCKER_DATABASE;

mongoose
  .connect(dockerConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('*** Connection to MongoDB Successful!'));

app.listen(process.env.PORT, () => {
  console.log(
    `[${process.env.NODE_ENV}] App listening on port ${process.env.PORT}`,
  );
});
