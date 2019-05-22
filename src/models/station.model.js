const mongoose = require('mongoose');

const { Schema } = mongoose;

const StationSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
});

StationSchema.virtual('cars', {
  ref: 'Car',
  localField: '_id',
  foreignField: 'stationId',
  justOne: false, // set true for one-to-one relationship
});

module.exports = mongoose.model('Station', StationSchema);
