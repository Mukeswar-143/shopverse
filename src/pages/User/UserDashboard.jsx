import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userAPI from "./UserApi";
import { motion } from "framer-motion";

import Electronics from "../../images/electronics.png";
import Mobiles from "../../images/mobiles.jpg";
import Clothes from "../../images/clothes.png";
import Home from "../../images/homeappliances.png";
import Sports from "../../images/sports.jpg";
import Beauty from "../../images/beauty.jpg";
import Toys from "../../images/toys.jpg";
import Books from "../../images/books.jpg";
import Groceries from "../../images/groceries.jpg";

export default function UserDashboard() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const categories = [
    { name: "Electronics", image: Electronics },
    { name: "Mobiles", image: Mobiles },
    { name: "Clothes", image: Clothes },
    { name: "Home Appliances", image: Home },
    { name: "Books", image: Books },
    { name: "Sports", image: Sports },
    { name: "Beauty", image: Beauty },
    { name: "Toys", image: Toys },
    { name: "Groceries", image: Groceries },
  ];

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await userAPI.dashboard();
        setMessage(res.data);
        setError("");
      } catch (err) {
        console.error("Dashboard error", err);
        setError("Access denied or token invalid");
        setMessage("");
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
        color: "#fff",
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className="fw-bold display-5">Welcome to ShopVerse</h2>
          <p className="lead">
            Explore top categories and enjoy your personalized shopping experience.
          </p>
        </motion.div>

        <motion.div
          className="row g-4 justify-content-center"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              className="col-6 col-md-4 col-lg-3 text-center"
              variants={{
                hidden: { opacity: 0, y: 100 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={`/category/${encodeURIComponent(cat.name)}`}
                className="text-decoration-none text-white"
              >
                <motion.div
                  className="card h-100 p-4 border-0 d-flex align-items-center justify-content-center"
                  style={{
                    minHeight: "220px",
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
                    borderRadius: "16px",
                    backdropFilter: "blur(10px)",
                    transition: "all 1s ease",
                  }}
                >
                  <motion.img
                    src={cat.image}
                    alt={cat.name}
                    className="img-fluid mb-3"
                    style={{
                      maxHeight: "130px",
                      objectFit: "contain",
                      filter: "drop-shadow(0 0 3px white)",
                    }}
                    whileHover={{
                      rotate: [0, 10, -10, 0],
                      transition: { duration: 0.5 },
                    }}
                  />
                  <h6 className="fw-bold mt-2 text-dark">{cat.name}</h6>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
