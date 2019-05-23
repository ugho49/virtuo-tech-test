const { validationResult } = require('express-validator/check');
const Car = require('../models/car.model');
const Station = require('../models/station.model');

const notFoundError = (res, id) => {
  res.status(404).send({
    message: `Car not found with id ${id}`,
  });
};

const checkIfStationExist = async (res, stationId) => {
  const userExists = await Station.findById(stationId).select('_id').lean(); // returns true or false
  if (!userExists) {
    return res.status(400).json({ message: 'stationId is not valid' });
  }
};

class CarController {
  findAll(req, res) {
    Car.find()
      .then(cars => res.json(cars))
      .catch(() => res.status(500).send({ message: 'Fail to retrieve cars' }));
  }

  async findById(req, res) {
    const { id } = req.params;

    try {
      const car = await Car.findById(req.params.id);
      if (!car) {
        return notFoundError(res, id);
      }
      return res.json(car);
    } catch (err) {
      return notFoundError(res, id);
    }
  }

  async create(req, res) {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await checkIfStationExist(res, req.body.stationId);

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
      await checkIfStationExist(res, req.body.stationId);

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
      return res.status(500).json({
        message: 'Some error occurred while updating the Car.',
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const car = await Car.findOneAndDelete(id);
      if (!car) {
        return notFoundError(res, id);
      }
      res.json({ message: 'Car deleted successfully!' });
    } catch (err) {
      return notFoundError(res, id);
    }
  }
}

module.exports = CarController;
