const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const crossOriginMiddleware = require('./src/middlewares/cors');

// Logger
app.use(logger('dev'));

// Mongo
const mongo = {
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || '27017',
  database: process.env.MONGO_DATABASE || 'virtuo-test-tech',
};
const mongoUrl = `mongodb://${mongo.host}:${mongo.port}/${mongo.database}`;

mongoose.connect(mongoUrl, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('connection error:', err);
  process.exit(1);
});
db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Mongo succesfully connected');
});

// Cross-Origin Middleware
app.use(crossOriginMiddleware);

// Routes
require('./src/routes')(app);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
