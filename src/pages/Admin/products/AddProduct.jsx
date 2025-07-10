import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    pname: "",
    category: "",
    price: "",
    quantity: "",
    pdesc: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  const categoryOptions = [
    "Electronics",
    "Mobiles",
    "Clothes",
    "Home Appliances",
    "Books",
    "Sports",
    "Beauty",
    "Toys",
    "Groceries",
  ];

  const handleChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!imageFile) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("product", JSON.stringify(product));
    formData.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:8080/admin/product/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formData,
      });

      if (res.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("adminToken");
        navigate("/admin-login");
        return;
      }

      if (res.ok) {
        alert("Product added successfully!");
        setProduct({
          pname: "",
          category: "",
          price: "",
          quantity: "",
          pdesc: "",
        });
        setImageFile(null);
        navigate("/admin-home");
      } else {
        const msg = await res.text();
        setError(msg || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding: "2rem",
      }}
    >
      <motion.div
        className="card shadow-lg border-0 p-5"
        style={{
          maxWidth: "600px",
          width: "100%",
          borderRadius: "16px",
          background: "#fff",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-center text-primary fw-bold mb-4">Add New Product</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="pname"
              className="form-control"
              placeholder="Product Name"
              value={product.pname}
              onChange={handleChange}
              required
            />
            <label>Product Name</label>
          </div>

          <div className="form-floating mb-3">
            <select
              name="category"
              className="form-select"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categoryOptions.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <label>Category</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              required
            />
            <label>Price</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
            <label>Quantity</label>
          </div>

          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              name="pdesc"
              placeholder="Description"
              style={{ height: "100px" }}
              value={product.pdesc}
              onChange={handleChange}
              required
            ></textarea>
            <label>Description</label>
          </div>

          <div className="mb-3">
            <label className="form-label">Product Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Add Product
          </button>
        </form>
      </motion.div>
    </div>
  );
}
