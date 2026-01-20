Backend Setup

Step 1: Navigate to backend directory
cd backend

Step 2: Install backend dependencies
npm install

Step 3: Environment configuration

Create a .env file inside booking-backend with the following values:

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/booking-system


If you are using MongoDB Atlas, replace MONGO_URI with your cluster connection string.

Step 4: Run the backend server
npm run dev

Successful startup output:
Server running on port 3000
MongoDB connected


The backend will now be available at:

http://localhost:3000

Frontend Setup

Keep the backend running in a separate terminal.

Step 1: Open a new terminal and move to frontend
cd frontend

Step 2: Install frontend dependencies
npm install

Step 3: Start the frontend application
npm run dev

Expected output:
Local: http://localhost:5173


Open the URL in your browser to access the UI.

Project Overview

This application models a simplified but realistic booking engine used in home-services marketplaces.

Primary goals:

Enforced booking lifecycle

Controlled state transitions

Failure and cancellation handling

Admin / operations intervention

Clear separation of responsibilities

The frontend intentionally remains lightweight to emphasize backend correctness.

Technology Stack
Backend

Node.js

Express.js

MongoDB

Mongoose ODM

Frontend

React (Vite)

Axios

Booking State Flow
PENDING → ASSIGNED → IN_PROGRESS → COMPLETED

Failure Scenarios

CANCELLED — initiated by customer or provider

FAILED — provider rejection or no-show

All invalid or out-of-order transitions are explicitly rejected by the backend.
