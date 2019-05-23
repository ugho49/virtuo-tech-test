# VIRTUO - Technical Test

This project is a simple API who expose 2 endpoints with the purpose of handle cars by stations.

## Getting Started

This is a NodeJs project with a database in MongoDB.

### Prerequisites

- NodeJS 12+
- You need to have a MongoDB running.

Install dependencies :

```shell
npm install
```

### Running

The project is configure by default to interact with a mongo database on localhost port 27017.

The dev server operate by Nodemon will watch all the changes and restart the server if needed to handle the changes.
This one will also check all the code with eslint.

```shell
# Running dev server
npm run dev
```

The production server can be run by nodeJs :

```shell
# Running prod server with npm
npm start
```

Or with a simple command line :

```shell
# Running prod server with node
node ./bin/wwww
```

The server will listen by default on [http://locahost:3000](http://locahost:3000)

### Testing

All the tests are stored in the folder `test` and can be run with the command :

```shell
npm test
```

## Configuration

The application can be deployed in production with different settings.
This settings can be changed by environment variables listed here :

``` shell
# The port of the application
PORT (default: 3000)

# Mongo configuration
MONGO_HOST (default: localhost)
MONGO_PORT (default: 27017)
MONGO_DATABASE (default: virtuo-test-tech)
```
