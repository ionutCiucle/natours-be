# natours-be

### Steps to run the app

#### Add the config.env file

The app needs a `config.env` file in the app root, having the following structure:

```
NODE_ENV=development
PORT=<somePortNumber>
DATABASE=<mongoDbConnectionString>
DATABASE_USER=<mongoDbUserName>
DATABASE_PASSWORD=<mongoDbPassword>
```

#### Install node modules

`npm install`

#### Start the node.js app

`npm start`
