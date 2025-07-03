import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdAddCircleOutline,
  MdInventory2,
  MdAssignment,
  MdInsights,
  MdSettings,
} from "react-icons/md";

export default function AdminHome() {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("adminUsername");//it will get user name from login (local storage)
    setAdminName(name || "Admin");
  }, []);

  const adminOptions = [
    { name: "Add Product", path: "/admin/add-product", icon: <MdAddCircleOutline size={40} color="#2575fc" /> },
    { name: "View Products", path: "/admin/products", icon: <MdInventory2 size={40} color="#2575fc" /> },
    { name: "Orders", path: "/admin/orders", icon: <MdAssignment size={40} color="#2575fc" /> },
    { name: "Analytics", path: "/admin/analytics", icon: <MdInsights size={40} color="#2575fc" /> },
    { name: "Settings", path: "/admin/settings", icon: <MdSettings size={40} color="#2575fc" /> },
  ];

  return (
    <div
      className="container-fluid min-vh-100 d-flex flex-column align-items-center"
      style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding: "2rem",
      }}
    >
      <motion.h2
        className="text-white fw-bold mb-3"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Hi, {adminName}
      </motion.h2>

      <motion.h4
        className="text-white fw-normal mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Welcome to the Admin Dashboard
      </motion.h4>

      <div className="row g-3 justify-content-center w-100" style={{ maxWidth: "1200px" }}>
        {adminOptions.map((opt, index) => (
          <motion.div
            className="col-6 col-sm-4 col-md-3 text-center"
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={opt.path} className="text-decoration-none text-dark">
              <div
                className="card p-4 shadow-lg border-0"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "16px",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <div className="mb-2">{opt.icon}</div>
                <h6 className="fw-semibold">{opt.name}</h6>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
