const socket = io();

// 🔑 Register the user's role from token
const token = localStorage.getItem('token');
if (token) {
  const decoded = JSON.parse(atob(token.split('.')[1]));
  socket.emit('register', decoded.role); // 'student' or 'admin'
}

// Optional: Debug logs
socket.on('bookingCreated', (data) => {
  console.log('📥 Booking Created:', data);
});

socket.on('bookingUpdated', (data) => {
  console.log('✏️ Booking Updated:', data);
});

socket.on('bookingDeleted', (bookingId) => {
  console.log('❌ Booking Deleted:', bookingId);
});

socket.on('bookingCancelled', (bookingId) => {
  console.log('🚫 Booking Cancelled:', bookingId);
});