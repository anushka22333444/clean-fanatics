import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

// CREATE
export const createBooking = (data) =>
  API.post("/bookings", data);

// ACTIONS
export const assignProvider = (bookingId, data) =>
  API.post(`/bookings/${bookingId}/assign`, data);

export const startBooking = (bookingId, data) =>
  API.post(`/bookings/${bookingId}/start`, data);

export const completeBooking = (bookingId, data) =>
  API.post(`/bookings/${bookingId}/complete`, data);

export const cancelBooking = (bookingId, data) =>
  API.post(`/bookings/${bookingId}/cancel`, data);

export const failBooking = (bookingId, data) =>
  API.post(`/bookings/${bookingId}/fail`, data);
