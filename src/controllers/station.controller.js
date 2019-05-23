const { validationResult } = require('express-validator/check');

const Station = require('../models/station.model');

const notFoundError = (res, id) => {
  res.status(404).send({
    message: `Station not found with id ${id}`,
  });
};

class StationController {
  findAll(req, res) {
    Station.find()
      .populate('cars')
      .then(stations => res.json(stations))
      .catch(() => res.status(500).send({ message: 'Fail to retrieve stations' }));
  }

  async findById(req, res) {
    const { id } = req.params;

    try {
      const station = await Station.findById(req.params.id).populate('cars');
      if (!station) {
        return notFoundError(res, id);
      }
      return res.json(station);
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

    // Create a model
    const station = new Station({
      name: req.body.name,
    });

    try {
      // Save Model in the database
      const data = await station.save();
      return res.status(201).json(data);
    } catch (err) {
      return res.status(500).json({
        message: 'Some error occurred while creating the Station.',
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
      // Find note and update it with the request body
      const data = await Station.findByIdAndUpdate(id, {
        name: req.body.name,
      }, { new: true }).populate('cars');

      if (!data) {
        return notFoundError(res, id);
      }

      return res.json(data);
    } catch (err) {
      return res.status(500).json({
        message: `Error updating station with id ${id}`,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const data = await Station.findById(id).populate('cars');
      if (!data) {
        return notFoundError(res, id);
      }
      if (data.cars.length > 0) {
        return res.status(403).json({
          message: 'Impossible to remove, cars are affiliate to this station. Please change their affiliation before delete this station',
        });
      }
      await Station.deleteOne({ _id: id });
      return res.json({ message: 'Station deleted successfully!' });
    } catch (err) {
      return notFoundError(res, id);
    }
  }
}

module.exports = StationController;
