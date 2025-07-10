import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "./UserApi"; // Adjust the path if needed

export default function UserLogin({ setIsUserLoggedIn }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent admins from logging in via user form
        if (formData.username.toLowerCase().includes("admin")) {
            setLoginError("Access Denied: Admin credentials are not allowed here");
            return;
        }

        try {
            const res = await userAPI.login(formData);
            const token = typeof res.data === "string" ? res.data : res.data.token;

            localStorage.setItem("userToken", token);
            localStorage.setItem("username", formData.username);
            alert("Login successful");
            setIsUserLoggedIn(true);
            navigate("/user-dashboard");
        } catch (error) {
            console.error("Login error:", error);
            setLoginError("Invalid username or password");
        }
    };

    return (
        <div
            className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
            style={{
                background: "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
                padding: "2rem",
            }}
        >
            <div className="row w-100" style={{ maxWidth: "1200px" }}>
                <div className="col-md-6 text-white d-flex flex-column justify-content-center">
                    <h2 className="display-4 fw-bold">ShopVerse</h2>
                    <h3 className="display-3 fw-bold">User Portal</h3>
                    <p className="lead opacity-75">
                        Login to explore our latest products, manage orders, and enjoy a personalized shopping experience.
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
                        <h3 className="text-center mb-3 fw-semibold text-danger">
                            User Login
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
                                className="btn btn-danger w-100 py-2 mb-3"
                            >
                                Login
                            </button>
                        </form>

                        <div className="text-center text-muted">or</div>

                        <button
                            type="button"
                            className="btn btn-outline-dark w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
                            disabled
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
                                href="/user-register"
                                className="text-decoration-none text-danger fw-semibold"
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
