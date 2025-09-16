# User Management Dashboard
A full-stack web application to manage users with CRUD operations (Create, Read, Update, Delete).
Built with React (frontend) and Node.js + Express + SQLite (backend).

# Features
Add, edit, update, and delete users
User list with details (name, email, phone, company, address, etc.)
RESTful API with validation and error handling
SQLite database (file-based, no extra setup)
Search and partial updates supported
Responsive React UI with navigation

# Tech Stack
  # Frontend
       React.js
       React Router DOM
       Axios
       Backend
Node.js + Express
SQLite (with sqlite3 npm package)
CORS + dotenv

# Project Structure
user-management-dashboard/
│── backend/
│   ├── database.js        # SQLite DB setup
│   ├── server.js          # Express server
│   └── routes/users.js    # User CRUD APIs
│
│── frontend/
│   ├── src/
│   │   ├── api.js         # Axios config (connects frontend ↔ backend)
│   │   ├── App.js         # React Router setup
│   │   ├── components/    # Layout, Header, Footer, etc.
│   │   └── pages/         # UserList.js, UserForm.js
│   └── public/index.html  # Entry point
│
└── README.md
