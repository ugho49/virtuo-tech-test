const stationsRoutes = require('./routes/stations.route');
const carsRoutes = require('./routes/cars.route');

module.exports = (app) => {
  app.use('/stations', stationsRoutes);
  app.use('/cars', carsRoutes);
};
