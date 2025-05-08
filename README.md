# eventease-final
Team members:
Abdullahi Abdirahman - 100% of the work
How the code works
 Backend (Node.js + Express + MongoDB)
server.js is the entry point; it connects to MongoDB and sets up API routes.

Auth routes:

POST /api/auth/register registers users (passwords hashed).

POST /api/auth/login returns a JWT for protected routes.

Event routes:

GET /api/events shows all events.

POST /api/events creates a new event (JWT required).

GET /api/events/:id fetches one event by ID.

DELETE /api/events/:id deletes a user's own event (JWT required).

 Frontend (HTML + JS + Bootstrap)
index.html loads all events and shows "delete" buttons if a user is logged in.

create.html submits a form to create a new event (POST request with JWT).

details.html loads a single event using ?id=... in the URL.

login.html and register.html authenticate users and store JWT in localStorage.

JavaScript files (script.js, create.js, etc.) manage API calls and DOM updates.

