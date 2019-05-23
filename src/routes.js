const stationRoutes = require('./routes/station.routes');
const carRoutes = require('./routes/car.routes');
const errorRoutes = require('./routes/error.routes');

module.exports = (app) => {
  app.use('/stations', stationRoutes);
  app.use('/cars', carRoutes);

  errorRoutes(app);
};
