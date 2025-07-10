import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import userAPI from "./UserApi";

export default function UserRegister() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        pnumber: "",
        address: "",
        role: "ROLE_USER",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await userAPI.register(formData);
            if (res.status === 200 || res.status === 201) {
                alert("User registered successfully");
                setFormData({
                    username: "",
                    password: "",
                    email: "",
                    pnumber: "",
                    address: "",
                    role: "ROLE_USER",
                });
                navigate("/user");
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Registration failed. Server error.");
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
            <motion.div
                className="row w-100"
                style={{ maxWidth: "1200px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="col-md-6 text-white d-flex flex-column justify-content-center"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="display-4 fw-bold">Create User Account</h1>
                    <p className="lead opacity-75">
                        Register to explore our product catalog, track your orders, and enjoy a personalized shopping experience.
                    </p>
                </motion.div>

                <motion.div
                    className="col-md-6"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="card p-5 shadow-lg border-0"
                        style={{
                            backdropFilter: "blur(12px)",
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "16px",
                            width: "100%",
                        }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 120 }}
                    >
                        <h3 className="text-center mb-3 fw-semibold text-primary">
                            User Registration
                        </h3>

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

                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="pnumber"
                                    name="pnumber"
                                    placeholder="Phone Number"
                                    value={formData.pnumber}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="pnumber">Phone Number</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    placeholder="Address"
                                    style={{ height: "100px" }}
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                                <label htmlFor="address">Address</label>
                            </div>

                            <input type="hidden" name="role" value="ROLE_USER" />

                            <motion.button
                                type="submit"
                                className="btn btn-danger w-100 py-2"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Register
                            </motion.button>
                        </form>

                        <p className="mt-4 text-center">
                            Already have an account?{" "}
                            <Link
                                to="/user"
                                className="text-decoration-none text-danger fw-semibold"
                            >
                                Login here
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
