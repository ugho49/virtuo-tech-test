const { validationResult } = require('express-validator/check');

const Station = require('../models/station.model');

const notFoundError = (res, id) => {
  res.status(404).send({
    message: `Station not found with id ${id}`,
  });
};

exports.findAll = (req, res) => {
  Station.find()
    .populate('cars')
    .then(stations => res.json(stations))
    .catch(err => res.status(500).send(err));
};

exports.findById = (req, res) => {
  const { id } = req.params;

  Station.findById(req.params.id)
    .populate('cars')
    .then((station) => {
      if (!station) {
        return notFoundError(res, id);
      }
      res.json(station);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return notFoundError(res, id);
      }
      return res.status(500).json({
        message: `Error retrieving station with id ${id}`,
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Create a model
  const station = new Station({
    name: req.body.name,
  });

  // Save Model in the database
  station.save()
    .populate('cars')
    .then((data) => {
      res.status(201).json(data);
    }).catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while creating the Station.',
      });
    });
};

exports.update = (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;

  // Find note and update it with the request body
  Station.findByIdAndUpdate(id, {
    name: req.body.name,
  }, { new: true })
    .populate('cars')
    .then((station) => {
      if (!station) {
        return notFoundError(res, id);
      }
      res.send(station);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return notFoundError(res, id);
      }
      return res.status(500).json({
        message: `Error updating station with id ${id}`,
      });
    });
};


exports.delete = (req, res) => {
  const { id } = req.params;

  Station.findByIdAndRemove(id)
    .then((station) => {
      if (!station) {
        return notFoundError(res, id);
      }
      res.json({ message: 'Station deleted successfully!' });
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return notFoundError(res, id);
      }
      return res.status(500).json({
        message: `Could not delete station with id ${id}`,
      });
    });
};
