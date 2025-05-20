const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http'); // Required for Socket.IO
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const roomRoutes = require('./routes/roomRoutes');

dotenv.config();
const app = express();
const server = http.createServer(app); // HTTP server for Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// Register socket globally
app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('✅ A user connected via Socket.IO');

  socket.on('register', (role) => {
    console.log(`👤 Registered as ${role}`);
  });

  socket.on('disconnect', () => {
    console.log('❌ A user disconnected');
  });
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/rooms', roomRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');

  server.listen(process.env.PORT || 3000, () => {
    console.log(`🚀 Server running at http://localhost:${process.env.PORT || 3000}`);
  });
}).catch((err) => console.error('❌ MongoDB error:', err));
