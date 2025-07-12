import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [expandedCards, setExpandedCards] = useState({}); // Track "View More"

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://productcatlog-1.onrender.com/admin/products", {
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

  const toggleExpand = (productId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

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
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="col-12"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <div
                className="card shadow border-0"
                style={{
                  borderRadius: "20px",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "row",
                  padding: "16px",
                }}
              >
                {/* Product Image */}
                {product.image?.imagePath && (
                  <div
                    style={{
                      minWidth: "220px",
                      maxWidth: "220px",
                      height: "220px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={`https://productcatlog-1.onrender.com/images/${product.image.imagePath}`}
                      alt={product.pname}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}

                {/* Product Details */}
                <div className="ps-4 pe-2 d-flex flex-column justify-content-between w-100">
                  <div>
                    <h5 className="fw-bold text-primary">{product.pname}</h5>

                    <p className="mb-1">
                      <strong>Price:</strong>{" "}
                      <span className="text-success">₹{product.price}</span>
                    </p>

                    <p
                      className="mb-2 text-muted"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: expandedCards[product.id] ? "none" : "4",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <strong>Description:</strong> {product.pdesc}
                    </p>

                    {expandedCards[product.id] && (
                      <>
                        <p className="mb-1">
                          <strong>Category:</strong> {product.category}
                        </p>
                        <p className="mb-1">
                          <strong>Model:</strong> {product.modelName || "N/A"}
                        </p>
                        <p className="mb-1">
                          <strong>Color:</strong> {product.color || "N/A"}
                        </p>
                        <p className="mb-1">
                          <strong>Quantity:</strong> {product.quantity}
                        </p>
                        <p className="mb-1">
                          <strong>Created By:</strong> {product.createdBy}
                        </p>
                        <div className="text-muted small">
                          <p className="mb-0">Created: {product.createdDate}</p>
                          <p className="mb-0">Updated: {product.updatedDate}</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary mt-3"
                      onClick={() => toggleExpand(product.id)}
                    >
                      {expandedCards[product.id] ? "View Less" : "View More"}
                    </button>
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
