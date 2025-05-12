const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");

exports.createBooking = async (req, res) => {
  try {
    const { roomId, userId, date, startTime, endTime } = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // ✅ NEW: Prevent duplicate booking by same student for same time slot
    const duplicate = await Booking.findOne({
      roomId,
      userId,
      date,
      startTime,
      endTime
    });

    if (duplicate) {
      return res.status(400).json({ message: "You’ve already booked this room for the same slot." });
    }

    // ✅ Capacity check
    const existingBookings = await Booking.countDocuments({ roomId, date });
    if (existingBookings >= room.capacity) {
      return res.status(400).json({ message: "Room is fully booked for this date" });
    }

    const booking = new Booking({
      roomId,
      userId,
      date,
      startTime,
      endTime,
      timestamp: new Date()
    });

    await booking.save();

    console.log(`📅 Booking created by Student: Room ${room.name}, ${date} ${startTime}–${endTime}`);

    if (req.io && req.io.emit) {
      req.io.emit("bookingCreated", booking);
    }

    res.status(201).json({ message: "Booking successful", booking });

  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("roomId")
      .populate("userId");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to get bookings", error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).populate("roomId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user bookings", error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Booking.findByIdAndDelete(id);

    if (deleted) {
      console.log(`❌ Booking deleted: ${deleted.roomId} on ${deleted.date} (${deleted.startTime}–${deleted.endTime})`);
    }

    if (req.io && req.io.emit) {
      req.io.emit("bookingDeleted", id);
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking", error: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { roomId, userId, date, startTime, endTime } = req.body;
    const { id } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { roomId, userId, date, startTime, endTime, timestamp: new Date() },
      { new: true }
    );

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    console.log(`✏️ Booking updated: ${booking.roomId} to ${date} ${startTime}–${endTime}`);

    if (req.io && req.io.emit) {
      req.io.emit("bookingUpdated", booking);
    }

    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking", error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndDelete(bookingId).populate("roomId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log(`🗑️ Booking cancelled by Student: Room ${booking.roomId.name}, ${booking.date} ${booking.startTime}–${booking.endTime}`);

    if (req.io && req.io.emit) {
      req.io.emit("bookingCancelled", bookingId);
    }

    res.status(200).json({ message: "Booking cancelled successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to cancel booking", error: error.message });
  }
};