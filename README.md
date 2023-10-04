# natours-be

### Add a MongoDB Server

#### Install Docker and run a container using a MongoDB image

`docker container run --name <yourContainerName> --publish 27017:27017 -d mongo`

#### Create the `natours` Database from the Docker Container (can also be done using the Docker desktop app, by accessing the Exec tab in the Container UI)

##### Access the container using `bash`

`docker container exec -it <yourContainerName> bash`

##### Use the mongo shell `mongosh` to create the `natours` database

`use natours`

### Install node dependencies and start nodemon

#### Install node modules

`npm install`

#### Start the node.js app

`npm start`
