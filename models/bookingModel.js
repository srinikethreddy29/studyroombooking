const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  roomId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date:     { type: String, required: true },
  startTime:{ type: String, required: true },
  endTime:  { type: String, required: true },
  timestamp:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);