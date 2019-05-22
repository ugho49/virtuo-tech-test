const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const crossOriginMiddleware = require('./src/middlewares/cors');

// Logger
app.use(logger('dev'));

// Cross-Origin Middleware
app.use(crossOriginMiddleware);

// Routes
require('./src/routes')(app);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
