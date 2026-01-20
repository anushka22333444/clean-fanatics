const {
  createBooking,
  assignProvider,
  startBooking,
  completeBooking,
  cancelBooking,
  failBooking,
} = require("../services/bookingService");

// CREATE
async function createBookingController(req, res) {
  try {
    const { customerId, serviceType, scheduledAt } = req.body;

    if (!customerId || !serviceType || !scheduledAt) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const booking = await createBooking({
      customerId,
      serviceType,
      scheduledAt,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ASSIGN
async function assignProviderController(req, res) {
  try {
    const { bookingId } = req.params;
    const { providerId } = req.body;

    if (!providerId) {
      return res.status(400).json({ error: "providerId is required" });
    }

    const booking = await assignProvider({ bookingId, providerId });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// START
async function startBookingController(req, res) {
  try {
    const { bookingId } = req.params;
    const { providerId } = req.body;

    if (!providerId) {
      return res.status(400).json({ error: "providerId is required" });
    }

    const booking = await startBooking({ bookingId, providerId });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// COMPLETE
async function completeBookingController(req, res) {
  try {
    const { bookingId } = req.params;
    const { providerId } = req.body;

    if (!providerId) {
      return res.status(400).json({ error: "providerId is required" });
    }

    const booking = await completeBooking({ bookingId, providerId });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// CANCEL
async function cancelBookingController(req, res) {
  try {
    const { bookingId } = req.params;
    const { actorType, actorId, reason } = req.body;

    if (!actorType) {
      return res.status(400).json({ error: "actorType is required" });
    }

    const booking = await cancelBooking({
      bookingId,
      actorType,
      actorId,
      reason,
    });

    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// FAIL
async function failBookingController(req, res) {
  try {
    const { bookingId } = req.params;
    const { actorType, actorId, reason } = req.body;

    if (!actorType) {
      return res.status(400).json({ error: "actorType is required" });
    }

    const booking = await failBooking({
      bookingId,
      actorType,
      actorId,
      reason,
    });

    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// ✅ EXPORT ONCE
module.exports = {
  createBookingController,
  assignProviderController,
  startBookingController,
  completeBookingController,
  cancelBookingController,
  failBookingController,
};
