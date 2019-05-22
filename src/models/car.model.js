const mongoose = require('mongoose');

const { Schema } = mongoose;

const CarSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    minlength: 3,
  },
  available: {
    type: Schema.Types.Boolean,
    required: true,
  },
  stationId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('Car', CarSchema);
