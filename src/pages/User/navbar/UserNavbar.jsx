import React from "react";
import '../../Admin/navbar/Navbar.css';
import { Link, useNavigate } from "react-router-dom";

export default function UserNavbar({ isUserLoggedIn, setIsUserLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userUsername");
    setIsUserLoggedIn(false);
    navigate("/user");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/user-dashboard">
          ShopVerse (User)
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#userNavbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="userNavbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/user-dashboard">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Add to Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user/products">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user/about">
                About
              </Link>
            </li>
          </ul>
          {isUserLoggedIn && (
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
