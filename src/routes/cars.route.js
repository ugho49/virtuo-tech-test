const express = require('express');
const { check } = require('express-validator/check');

const router = express.Router();
const controller = require('../controllers/car.controller');

router.get('/', controller.findAll);

router.post('/', [
  check('available').isBoolean(),
  check('name').isLength({ min: 3 }),
  check('stationId').not().isEmpty(),
], controller.create);

router.get('/:id', controller.findById);

router.put('/:id', [
  check('available').isBoolean(),
  check('name').isLength({ min: 3 }),
  check('stationId'),
], controller.update);

router.delete('/:id', controller.delete);

module.exports = router;
