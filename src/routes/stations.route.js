const express = require('express');

const router = express.Router();
const { check } = require('express-validator/check');

const controller = require('../controllers/station.controller');

router.get('/', controller.findAll);

router.post('/', [
  check('name').isLength({ min: 3 }),
], controller.create);

router.get('/:id', controller.findById);

router.put('/:id', [
  check('name').isLength({ min: 3 }),
], controller.update);

router.delete('/:id', controller.delete);

module.exports = router;
