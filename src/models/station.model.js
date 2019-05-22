const mongoose = require('mongoose');

const { Schema } = mongoose;

// Set `virtuals: true` so `res.json()` works
const StationSchema = new mongoose.Schema({
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
}, { toJSON: { virtuals: true } });

StationSchema.virtual('cars', {
  ref: 'Car',
  localField: '_id',
  foreignField: 'stationId',
  justOne: false, // set true for one-to-one relationship
});

module.exports = mongoose.model('Station', StationSchema);
