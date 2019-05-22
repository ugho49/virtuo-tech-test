const stationsRoutes = require('./routes/stations');
const carsRoutes = require('./routes/cars');

module.exports = (app) => {
  app.use('/stations', stationsRoutes);
  app.use('/cars', carsRoutes);
};
