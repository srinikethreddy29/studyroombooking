const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.get('/:userId', bookingController.getUserBookings);

// ✅ Place cancel route BEFORE the general delete route
router.delete('/cancel/:bookingId', bookingController.cancelBooking);

router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;