import React from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      {/* Header */}
      <header style={{ background: "#333", color: "#fff", padding: "10px" }}>
        <h2>User Management Dashboard</h2>
        <nav>
          <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>
            Home
          </Link>
          <Link to="/users" style={{ color: "#fff", marginRight: "10px" }}>
            Users
          </Link>
          <Link to="/add" style={{ color: "#fff" }}>
            Add User
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ padding: "20px" }}>
        <Outlet /> {/* This renders the child route */}
      </main>

      {/* Footer */}
      <footer style={{ background: "#eee", padding: "10px", marginTop: "20px" }}>
        <p>© {new Date().getFullYear()} User Management System</p>
      </footer>
    </div>
  );
}

export default Layout;
