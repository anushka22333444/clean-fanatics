const express = require("express");
const {
  createBookingController,
  assignProviderController,
  startBookingController,
  completeBookingController,
  cancelBookingController,
  failBookingController,
} = require("../controllers/bookingController");

const router = express.Router();

// Customer
router.post("/", createBookingController);

// Provider workflow
router.post("/:bookingId/assign", assignProviderController);
router.post("/:bookingId/start", startBookingController);
router.post("/:bookingId/complete", completeBookingController);

// Failure handling
router.post("/:bookingId/cancel", cancelBookingController);
router.post("/:bookingId/fail", failBookingController);

module.exports = router;
