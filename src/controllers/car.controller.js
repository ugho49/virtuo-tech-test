const { validationResult } = require('express-validator/check');
const Car = require('../models/car.model');
const Station = require('../models/station.model');

const notFoundError = (res, id) => {
  res.status(404).send({
    message: `Car not found with id ${id}`,
  });
};

class CarController {
  findAll(req, res) {
    Car.find()
      .then(cars => res.json(cars))
      .catch(err => res.status(500).send(err));
  }

  findById(req, res) {
    const { id } = req.params;

    Car.findById(req.params.id)
      .then((car) => {
        if (!car) {
          return notFoundError(res, id);
        }
        res.json(car);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return notFoundError(res, id);
        }
        return res.status(500).json({
          message: `Error retrieving car with id ${id}`,
        });
      });
  }

  async create(req, res) {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userExists = await Station.findById(req.body.stationId).select('_id').lean(); // returns true or false
      if (!userExists) {
        return res.status(400).json({ message: 'stationId is not valid' });
      }

      // Create a model
      const car = new Car({
        name: req.body.name,
        available: req.body.available,
        stationId: req.body.stationId,
      });

      // Save Model in the database
      const data = await car.save();
      return res.status(201).json(data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json({
        message: 'Some error occurred while creating the Car.',
      });
    }
  }

  async update(req, res) {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
      const userExists = await Station.findById(req.body.stationId).select('_id').lean(); // returns true or false
      if (!userExists) {
        return res.status(400).json({ message: 'stationId is not valid' });
      }

      // Create a model
      const newValues = {
        name: req.body.name,
        available: req.body.available,
        stationId: req.body.stationId,
      };

      // Save Model in the database
      const car = await Car.findByIdAndUpdate(id, newValues, { new: true });
      if (!car) {
        return notFoundError(res, id);
      }
      return res.status(200).json(car);
    } catch (err) {
      if (err.kind && err.kind === 'ObjectId') {
        return notFoundError(res, id);
      }
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json({
        message: 'Some error occurred while updating the Car.',
      });
    }
  }

  delete(req, res) {
    const { id } = req.params;

    Car.findByIdAndRemove(id)
      .then((car) => {
        if (!car) {
          return notFoundError(res, id);
        }
        res.json({ message: 'Car deleted successfully!' });
      }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return notFoundError(res, id);
        }
        return res.status(500).json({
          message: `Could not delete car with id ${id}`,
        });
      });
  }
}

module.exports = CarController;
