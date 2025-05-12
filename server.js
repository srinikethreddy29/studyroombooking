const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Socket logging: who connects
io.on('connection', (socket) => {
  console.log(`⚡ Socket Connected: ${socket.id}`);

  socket.on('register', (role) => {
    if (role === 'admin') console.log('👤 Admin connected via socket');
    else if (role === 'student') console.log('🎓 Student connected via socket');
    else console.log(' Unknown role connected');
  });

  socket.on('disconnect', () => {
    console.log(`❌ Socket Disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
  console.log(`Signup page: http://localhost:${PORT}/signup.html`);
});