import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminHome from "./pages/Admin/AdminHome";
import AddProduct from "./pages/Admin/products/AddProduct";
import ViewProducts from "./pages/Admin/products/ViewProducts";
import Navbar from "./pages/Admin/navbar/Navbar";

export default function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      {isAdminLoggedIn && (
        <Navbar
          isAdminLoggedIn={isAdminLoggedIn}
          setIsAdminLoggedIn={setIsAdminLoggedIn}
        />
      )}

      <Routes>
        <Route
          path="/admin"
          element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />}
        />
        <Route path="/admin-register" element={<AdminRegister />} />

        <Route
          path="/admin-home"
          element={
            isAdminLoggedIn ? (
              <AdminHome />
            ) : (
              <p className="text-center mt-5 text-danger">Access Denied</p>
            )
          }
        />

        <Route
          path="/admin/add-product"
          element={
            isAdminLoggedIn ? (
              <AddProduct />
            ) : (
              <p className="text-center mt-5 text-danger">Access Denied</p>
            )
          }
        />

        <Route
          path="/admin/products"
          element={
            isAdminLoggedIn ? (
              <ViewProducts />
            ) : (
              <p className="text-center mt-5 text-danger">Access Denied</p>
            )
          }
        />

    
        <Route
          path="*"
          element={
            <p className="text-center mt-5 text-warning">
              Page not found. Please check the URL.
            </p>
          }
        />
      </Routes>
    </Router>
  );
}
