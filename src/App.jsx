import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminHome from "./pages/Admin/AdminHome";
import AddProduct from "./pages/Admin/products/AddProduct";
import ViewProducts from "./pages/Admin/products/ViewProducts";
import Navbar from "./pages/Admin/navbar/Navbar";

import UserRegister from "./pages/User/UserRegister";
import UserLogin from "./pages/User/UserLogin";
import UserDashboard from "./pages/User/UserDashboard";
import CategoryProducts from "./pages/User/product/CategoryProducts"; // ✅ Corrected import

export default function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");
    setIsAdminLoggedIn(!!adminToken);
    setIsUserLoggedIn(!!userToken);
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

        <Route path="/user-register" element={<UserRegister />} />
        <Route
          path="/user"
          element={<UserLogin setIsUserLoggedIn={setIsUserLoggedIn} />}
        />
        <Route
          path="/user-dashboard"
          element={
            isUserLoggedIn ? (
              <UserDashboard />
            ) : (
              <p className="text-center mt-5 text-danger">Access Denied</p>
            )
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            isUserLoggedIn ? (
              <CategoryProducts />
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
