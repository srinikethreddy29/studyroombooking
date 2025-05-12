const User = require('../models/userModel');
const Room = require('../models/roomModel');
const Booking = require('../models/bookingModel');

exports.getDashboardData = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const rooms = await Room.countDocuments();
    const bookings = await Booking.countDocuments();
    res.json({ users, rooms, bookings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load dashboard', error: err.message });
  }
};