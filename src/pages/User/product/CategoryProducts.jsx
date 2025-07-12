import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./CategoryProducts.css";

const IMAGE_BASE_URL = "https://productcatlog-1.onrender.com/images/";

export default function CategoryProducts() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation] = useState(0);

  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [doorNo, setDoorNo] = useState("");
  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const res = await axios.get(
          `https://productcatlog-1.onrender.com/customer/products?category=${encodeURIComponent(categoryName)}`,
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

  const handleZoomIn = () => setZoom((z) => Math.min(1.5, z + 0.2));
  const handleZoomOut = () => setZoom((z) => Math.max(0.5, z - 0.2));
  const closeModal = () => {
    setSelectedImage(null);
    setZoom(1);
  };

  const openCartModal = (product) => {
    setSelectedProduct(product);
    setCartModalOpen(true);
  };

  const closeCartModal = () => {
    setCartModalOpen(false);
    setDoorNo("");
    setStreet("");
    setDistrict("");
    setCity("");
    setPincode("");
    setPhone("");
    setSelectedProduct(null);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("userToken");

    if (!doorNo || !street || !district || !city || !pincode || !phone) {
      alert("All address fields and phone number are required.");
      return;
    }

    const fullAddress = `${doorNo}, ${street}, ${district}, ${city}, ${pincode}`;

    try {
      await axios.post(
        `https://productcatlog-1.onrender.com/customer/cart/add/${selectedProduct.id}`,
        { address: fullAddress, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product added to cart!");
      closeCartModal();
    } catch (err) {
      console.error("Failed to add product to cart:", err);
      alert("Failed to add to cart.");
    }
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
            className="col-md-4 mb-4"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card h-100 shadow-sm">
              <img
                src={`${IMAGE_BASE_URL}${product.image?.imagePath}`}
                alt={product.pname}
                className="card-img-top"
                style={{
                  height: "250px",
                  objectFit: "contain",
                  cursor: "pointer",
                  backgroundColor: "#f8f8f8",
                  padding: "10px",
                }}
                onClick={() =>
                  setSelectedImage(`${IMAGE_BASE_URL}${product.image?.imagePath}`)
                }
              />
              <div className="card-body">
                <h5 className="card-title">{product.pname}</h5>
                <p className="card-text text-muted">Price: ₹{product.price}</p>
                {product.color && (
                  <p className="card-text text-muted">Color: {product.color}</p>
                )}
                <p className="card-text text-secondary description-clamp">
                  {product.pdesc}
                </p>
                <button
                  className="btn btn-outline-success w-100"
                  onClick={() => openCartModal(product)}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link to="/user-dashboard" className="btn btn-outline-primary">
          ⬅ Back to Dashboard
        </Link>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-controls">
              <button onClick={handleZoomIn}>🔍 Zoom In</button>
              <button onClick={handleZoomOut}>🔎 Zoom Out</button>
              <button onClick={closeModal}>❌ Close</button>
            </div>
            <img
              src={selectedImage}
              alt="Zoomed View"
              className="popup-image"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
            />
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {cartModalOpen && selectedProduct && (
        <div className="cart-modal">
          <div className="cart-modal-content row-layout">
            <div className="cart-modal-image">
              <img
                src={`${IMAGE_BASE_URL}${selectedProduct.image?.imagePath}`}
                alt={selectedProduct.pname}
              />
            </div>

            <div className="cart-modal-details">
              <h5 className="mb-3">Confirm Product Details</h5>
              <p><strong>Name:</strong> {selectedProduct.pname}</p>
              <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
              {selectedProduct.color && (
                <p><strong>Color:</strong> {selectedProduct.color}</p>
              )}
              <p><strong>Description:</strong> {selectedProduct.pdesc}</p>

              {/* Structured Address Fields */}
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Door No"
                value={doorNo}
                onChange={(e) => setDoorNo(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <div className="d-flex justify-content-end gap-2 mt-2">
                <button className="btn btn-secondary" onClick={closeCartModal}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleAddToCart}>
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
