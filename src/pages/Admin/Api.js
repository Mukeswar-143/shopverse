import axios from "axios";

// const BASE_URL = "https://productcatlog.onrender.com";
const BASE_URL = "http://localhost:8080";

// Auth header using admin token
const authHeader = () => {
  const token = localStorage.getItem("adminToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const adminAPI = {
  // Admin Login
  login: (data) => axios.post(`${BASE_URL}/admins/login`, data),

  // Admin Registration
  register: (data) => axios.post(`${BASE_URL}/admins/register`, data),

  // Upload product with image (multipart/form-data)
  uploadProduct: (formData) =>
    axios.post(`${BASE_URL}/admin/product/upload`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        "Content-Type": "multipart/form-data"
      }
    }),

  // Get all products (admin-only)
  getAllProducts: () => axios.get(`${BASE_URL}/admin/products`, authHeader())
};

export default adminAPI;
