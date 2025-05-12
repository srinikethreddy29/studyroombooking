Study Room Booking System:

This is a simple web-based app that lets students book study rooms and helps admins manage room availability. We built this as part of our Sprint 1 work for SIT725 (Applied Software Engineering).

What It Does:

Students can sign up and log in
They can see available rooms and book them
Admins can add or delete rooms
Both dashboards have real-time updates (thanks to Socket.IO)
Students can also cancel their bookings if needed

Tech Stack Used:

Node.js + Express (Backend)
MongoDB (Database)
Materialize CSS (Frontend styling)
Socket.IO for real-time room updates
Jest + Supertest (testing, planned for Sprint 2)

Roles:
Student – Can view rooms and book/cancel
Admin – Can manage rooms and view bookings

How to Run It:

1. Clone the repo
2. Run npm install
3. Set up a .env file (for your MongoDB connection string)
4. Run the app using: npm start 
5. To test npm test

Team Members:
Sriniketh Reddy Dumbala – Backend + Testing
Srujan Kokkula – Frontend + UI/UX