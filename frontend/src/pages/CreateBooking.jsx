import { useState } from "react";
import { createBooking } from "../api/bookings";

export default function CreateBooking() {
  const [customerId, setCustomerId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [result, setResult] = useState(null);

  // internal / system-level field
  const serviceType = "generic";

  const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

  const handleCreate = async () => {
    if (!isValidObjectId(customerId)) {
      alert("Customer ID must be a valid Mongo ObjectId (24 hex chars)");
      return;
    }

    if (!scheduledAt) {
      alert("Scheduled time is required");
      return;
    }

    try {
      const res = await createBooking({
        customerId,
        serviceType,
        scheduledAt,
      });
      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <>
      <h2>Create Booking (Admin)</h2>

      <p style={{ fontSize: 13, color: "#6b7280" }}>
        Admin creates a booking entry for lifecycle management
      </p>

      <input
        placeholder="Customer ID (24-char Mongo ObjectId)"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />

      <input
        type="datetime-local"
        value={scheduledAt}
        onChange={(e) => setScheduledAt(e.target.value)}
      />

      <button onClick={handleCreate}>Create Booking</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </>
  );
}
