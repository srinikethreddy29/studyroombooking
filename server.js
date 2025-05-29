const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

// Injecting io into req for use in bookingController.js real-time events
// Makeing Socket.IO available in routes/controllers if needed
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Socket events
io.on('connection', (socket) => {
  console.log(`⚡ Socket Connected: ${socket.id}`);

  socket.on('register', (role) => {
    if (role === 'admin') console.log('👤 Admin connected via socket');
    else if (role === 'student') console.log('🎓 Student connected via socket');
    else console.log('⚠️ Unknown role connected');
  });

  socket.on('disconnect', () => {
    console.log(`❌ Socket Disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📄 Signup page: http://localhost:${PORT}/signup.html`);
});
