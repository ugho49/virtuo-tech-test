const express = require('express');

const router = express.Router();
const Car = require('../models/car.model');

router.get('/', (req, res) => {
  Car.find()
    .then(cars => res.json(cars))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
