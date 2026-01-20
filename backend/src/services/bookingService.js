const Booking = require("../models/Booking");
const BookingEvent = require("../models/BookingEvent");
const BookingStatus = require("../domain/bookingStatus");

async function createBooking({ customerId, serviceType, scheduledAt }) {
  const booking = await Booking.create({
    customerId,
    serviceType,
    scheduledAt,
    status: BookingStatus.PENDING,
  });

  await BookingEvent.create({
    bookingId: booking._id,
    fromStatus: null,
    toStatus: BookingStatus.PENDING,
    actorType: "customer",
    actorId: customerId,
  });

  return booking;
}

module.exports = {
  createBooking,
};

async function assignProvider({ bookingId, providerId }) {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.status !== BookingStatus.PENDING) {
    throw new Error("Only PENDING bookings can be assigned");
  }

  booking.providerId = providerId;
  booking.status = BookingStatus.ASSIGNED;
  await booking.save();

  await BookingEvent.create({
    bookingId: booking._id,
    fromStatus: BookingStatus.PENDING,
    toStatus: BookingStatus.ASSIGNED,
    actorType: "system",
  });

  return booking;
}
module.exports = {
  createBooking,
  assignProvider,
};

async function startBooking({ bookingId, providerId }) {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }

  if (!booking.providerId || booking.providerId.toString() !== providerId) {
    throw new Error("Unauthorized provider");
  }

  if (booking.status !== BookingStatus.ASSIGNED) {
    throw new Error("Only ASSIGNED bookings can be started");
  }

  booking.status = BookingStatus.IN_PROGRESS;
  await booking.save();

  await BookingEvent.create({
    bookingId: booking._id,
    fromStatus: BookingStatus.ASSIGNED,
    toStatus: BookingStatus.IN_PROGRESS,
    actorType: "provider",
    actorId: providerId,
  });

  return booking;
}
module.exports = {
  createBooking,
  assignProvider,
  startBooking,
};

async function completeBooking({ bookingId, providerId }) {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }

  if (!booking.providerId || booking.providerId.toString() !== providerId) {
    throw new Error("Unauthorized provider");
  }

  if (booking.status !== BookingStatus.IN_PROGRESS) {
    throw new Error("Only IN_PROGRESS bookings can be completed");
  }

  booking.status = BookingStatus.COMPLETED;
  await booking.save();

  await BookingEvent.create({
    bookingId: booking._id,
    fromStatus: BookingStatus.IN_PROGRESS,
    toStatus: BookingStatus.COMPLETED,
    actorType: "provider",
    actorId: providerId,
  });

  return booking;
}
module.exports = {
  createBooking,
  assignProvider,
  startBooking,
  completeBooking,
};
async function cancelBooking({ bookingId, actorType, actorId, reason }) {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.status === BookingStatus.COMPLETED && actorType !== "admin") {
    throw new Error("Completed booking cannot be cancelled");
  }

  booking.status = BookingStatus.CANCELLED;
  booking.cancelReason = reason || null;
  await booking.save();

  await BookingEvent.create({
    bookingId: booking._id,
    fromStatus: booking.status,
    toStatus: BookingStatus.CANCELLED,
    actorType,
    actorId,
    reason,
  });

  return booking;
}
module.exports = {
  createBooking,
  assignProvider,
  startBooking,
  completeBooking,
  cancelBooking,
};

async function failBooking({ bookingId, actorType, actorId, reason }) {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }

  if (
    booking.status !== BookingStatus.ASSIGNED &&
    booking.status !== BookingStatus.IN_PROGRESS
  ) {
    throw new Error("Only ASSIGNED or IN_PROGRESS bookings can be failed");
  }

  const fromStatus = booking.status;
  booking.status = BookingStatus.FAILED;
  booking.failReason = reason || null;
  await booking.save();

  await BookingEvent.create({
    bookingId: booking._id,
    fromStatus,
    toStatus: BookingStatus.FAILED,
    actorType,
    actorId,
    reason,
  });

  return booking;
}
module.exports = {
  createBooking,
  assignProvider,
  startBooking,
  completeBooking,
  cancelBooking,
  failBooking,
};
async function adminOverrideBooking(bookingId, status, note) {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error("Booking not found");

  booking.status = status;
  booking.adminNote = note;
  await booking.save();

  await BookingEvent.create({
    bookingId,
    type: "ADMIN_OVERRIDE",
    metadata: { status, note }
  });

  return booking;
}
module.exports = {
  createBooking,
  assignProvider,
  startBooking,
  completeBooking,
  cancelBooking,
  failBooking,
  adminOverrideBooking,
};