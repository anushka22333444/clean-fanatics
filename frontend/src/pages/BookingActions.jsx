import { useState } from "react";
import {
  assignProvider,
  startBooking,
  completeBooking,
  cancelBooking,
  failBooking,
} from "../api/bookings";

export default function BookingActions() {
  const [bookingId, setBookingId] = useState("");
  const [result, setResult] = useState(null);

  const providerId = "65f000000000000000000099";
  const customerId = "65f000000000000000000001";

  const handle = async (action) => {
    try {
      let res;

      if (action === "assign") {
        res = await assignProvider(bookingId, { providerId });
      }

      if (action === "start") {
        res = await startBooking(bookingId, { providerId });
      }

      if (action === "complete") {
        res = await completeBooking(bookingId, { providerId });
      }

      if (action === "cancel") {
        res = await cancelBooking(bookingId, {
          actorType: "customer",
          actorId: customerId,
          reason: "Change of plans",
        });
      }

      if (action === "fail") {
        res = await failBooking(bookingId, {
          actorType: "provider",
          actorId: providerId,
          reason: "Provider no-show",
        });
      }

      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <>
      <h2>Booking Actions</h2>

      <input
        placeholder="Booking ID (paste generated _id here)"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
      />

      <div className="actions">
        <button onClick={() => handle("assign")}>Assign</button>
        <button onClick={() => handle("start")}>Start</button>
        <button onClick={() => handle("complete")}>Complete</button>
        <button className="secondary" onClick={() => handle("cancel")}>
          Cancel
        </button>
        <button className="danger" onClick={() => handle("fail")}>
          Fail
        </button>
      </div>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </>
  );
}
