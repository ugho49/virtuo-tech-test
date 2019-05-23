const stationRoutes = require('./routes/station.routes');
const carRoutes = require('./routes/car.routes');

module.exports = (app) => {
  app.use('/stations', stationRoutes);
  app.use('/cars', carRoutes);
};
