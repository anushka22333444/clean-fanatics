import "./App.css";
import CreateBooking from "./pages/CreateBooking";
import BookingActions from "./pages/BookingActions";

function App() {
  return (
    <div className="page">
      <div className="content">
        <h1>Booking System – Anushka Singh</h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: 40,
          }}
        >
          This UI simulates customer actions and admin lifecycle control for bookings
        </p>

        <div className="grid">
          <div className="card" data-role="CUSTOMER">
            <h2>Customer Simulation</h2>
            <CreateBooking />
          </div>

          <div className="card" data-role="ADMIN / OPS">
            <h2>Admin </h2>
            <BookingActions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
