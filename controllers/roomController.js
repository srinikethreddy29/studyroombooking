const Room = require('../models/roomModel');

// Implemented full Room CRUD functions for admin panel (create, read, update, delete)
// Added Socket.IO emit calls for roomCreated and roomDeleted for real-time updates
exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();

    //  Log to terminal after room creation
    console.log(`✅ A Room created by Admin: ${room.name}`);

    //  Emit roomCreated event for real-time update
    if (req.io && req.io.emit) {
      req.io.emit("roomCreated", room);
    }

    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create room', error: err.message });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch rooms', error: err.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ message: 'Room not found' });

    //  Log room update
    console.log(`🛠️ Room updated by Admin: ${room.name}, capacity set to ${room.capacity}`);

    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update room', error: err.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // Log room deletion
    console.log(`❌ Room deleted by Admin: ${room.name}`);

    // Emit roomDeleted event for real-time update
    if (req.io && req.io.emit) {
      req.io.emit("roomDeleted", room._id.toString());
    }

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete room', error: err.message });
  }
};