import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./CategoryProducts.css";

export default function CategoryProducts() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const res = await axios.get(
          `http://localhost:8080/customer/products?category=${encodeURIComponent(categoryName)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          err.response?.status === 403
            ? "Access Denied. Please log in."
            : "Failed to load products."
        );
      }
    };

    fetchProducts();
  }, [categoryName]);

  const handleZoomIn = () => setZoom((z) => Math.min(1, z + 0.2));
  const handleZoomOut = () => setZoom((z) => Math.max(0.5, z - 0.2));
  const handleRotate = () => setRotation((r) => r + 90);
  const closeModal = () => {
    setSelectedImage(null);
    setZoom(1);
    setRotation(0);
  };

  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4"
      >
        <h2 className="fw-bold text-uppercase">{categoryName} Products</h2>
      </motion.div>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {products.length === 0 && !error && (
          <p className="text-center">No products found.</p>
        )}

        {products.map((product, index) => (
          <motion.div
            className="col-sm-6 col-md-4 col-lg-3 mb-4"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card h-100 shadow-sm p-3 text-center">
              {product.image?.imagePath && (
                <img
                  src={`http://localhost:8080${product.image.imagePath}`}
                  alt={product.pname}
                  className="img-fluid mb-3"
                  onClick={() =>
                    setSelectedImage(`http://localhost:8080${product.image.imagePath}`)
                  }
                  style={{
                    maxHeight: "300px",
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: "8px",
                    backgroundColor: "#f8f8f8",
                    cursor: "pointer",
                  }}
                />
              )}
              <h5 className="text-dark">{product.pname}</h5>
              <p className="mb-1 text-muted">Price: ₹{product.price}</p>
              <p className="small text-secondary">{product.pdesc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link to="/user-dashboard" className="btn btn-outline-primary">
          ⬅ Back to Dashboard
        </Link>
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-controls">
              <button onClick={handleZoomIn}>🔍 Zoom In</button>
              <button onClick={handleZoomOut}>🔎 Zoom Out</button>
              {/* <button onClick={handleRotate}>🔄 Rotate</button> */}
              <button onClick={closeModal}>❌ Close</button>
            </div>
            <img
              src={selectedImage}
              alt="Full view"
              className="popup-image"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
