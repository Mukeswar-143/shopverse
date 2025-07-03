import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ setIsAdminLoggedIn }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://productcatlog.onrender.com/admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const token = await res.text();
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminUsername", formData.username); // ✅ Store username
        alert("Login successful");
        setIsAdminLoggedIn(true);
        navigate("/admin-home");
      } else {
        setLoginError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Server error. Please try again later.");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login functionality to be implemented!");
    // Future: Implement OAuth using Firebase/Auth0
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding: "2rem",
      }}
    >
      <div className="row w-100" style={{ maxWidth: "1200px" }}>
        <div className="col-md-6 text-white d-flex flex-column justify-content-center">
          <h2 className="display-4 fw-bold">ShopVerse</h2>
          <h3 className="display-3 fw-bold">Admin Portal</h3>
          <p className="lead opacity-75">
            Login to manage products, view reports, and maintain your store.
            Secure access to your powerful dashboard.
          </p>
        </div>

        <div className="col-md-6">
          <div
            className="card p-5 shadow-lg border-0"
            style={{
              backdropFilter: "blur(12px)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "16px",
            }}
          >
            <h3 className="text-center mb-3 fw-semibold text-primary">
              Admin Login
            </h3>

            {loginError && (
              <div className="alert alert-danger" role="alert">
                {loginError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="username">Username</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mb-3"
              >
                Login
              </button>
            </form>

            <div className="text-center text-muted">or</div>

            <button
              type="button"
              className="btn btn-outline-danger w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
              onClick={handleGoogleLogin}
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google Icon"
                width="20"
                height="20"
              />
              Continue with Google
            </button>

            <p className="mt-4 text-center">
              Don’t have an account?{" "}
              <a
                href="/admin-register"
                className="text-decoration-none text-primary fw-semibold"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
