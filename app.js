const express = require('express');
const app = express();

const bookingsRouter = require('./routes/bookings');

app.use(express.json());
app.use('/bookings', bookingsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;