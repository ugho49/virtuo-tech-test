const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const crossOriginMiddleware = require('./src/middlewares/cors.middlewares');

// Logger
app.use(logger('dev'));

// Mongo
const mongo = {
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || '27017',
  database: process.env.MONGO_DATABASE || 'virtuo-test-tech',
};

mongoose.connect(`mongodb://${mongo.host}:${mongo.port}/${mongo.database}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
}).then(() => {
  // eslint-disable-next-line no-console
  console.log('Successfully connected to the database');
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross-Origin Middleware
app.use(crossOriginMiddleware);

// Routes
require('./src/routes')(app);

module.exports = app;
