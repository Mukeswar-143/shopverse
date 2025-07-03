import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://productcatlog.onrender.com/admin/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          setError("Failed to fetch products.");
        }
      } catch (err) {
        console.error(err);
        setError("Server error. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div
      className="container-fluid min-vh-100 py-5 px-3"
      style={{
        background: "linear-gradient(to right, #667eea, #764ba2)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <motion.h2
        className="text-center text-white fw-bold mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Admin Product List
      </motion.h2>

      {error && (
        <div className="alert alert-danger text-center mx-auto" style={{ maxWidth: "600px" }}>
          {error}
        </div>
      )}

      <div className="container">
        <motion.div
          className="row g-4"
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
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="col-sm-12 col-md-6 col-lg-4"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <div
                className="card shadow border-0 h-100"
                style={{ borderRadius: "20px", background: "#fff" }}
              >
                {product.image?.imagePath && (
                  <div
                    style={{
                      height: "220px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f8f9fa",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  >
                    <img
                      src={`https://productcatlog.onrender.com${product.image.imagePath}`}
                      alt={product.pname}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold text-primary">{product.pname}</h5>
                  <p className="text-muted mb-1">
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p className="mb-1">
                    <strong>Price:</strong>{" "}
                    <span className="text-success">₹{product.price}</span>
                  </p>
                  <p className="mb-1">
                    <strong>Quantity:</strong> {product.quantity}
                  </p>
                  <p className="mb-1">
                    <strong>Description:</strong>{" "}
                    <span className="text-muted">{product.pdesc}</span>
                  </p>
                  <p className="mb-1">
                    <strong>Created By:</strong> {product.createdBy}
                  </p>
                  <div className="text-muted small mt-auto">
                    <p className="mb-0">Created: {product.createdDate}</p>
                    <p className="mb-0">Updated: {product.updatedDate}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
