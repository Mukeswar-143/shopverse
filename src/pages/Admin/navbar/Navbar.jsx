import React from "react";
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isAdminLoggedIn, setIsAdminLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    setIsAdminLoggedIn(false);
    navigate("/admin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin-home">
          ShopVerse
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin-home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/about">
                About
              </Link>
            </li>
          </ul>
          {isAdminLoggedIn && (
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

