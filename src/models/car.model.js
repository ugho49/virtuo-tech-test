const mongoose = require('mongoose');

const { Schema } = mongoose;

const CarSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  available: {
    type: Boolean,
    required: true,
  },
  stationId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('Car', CarSchema);
