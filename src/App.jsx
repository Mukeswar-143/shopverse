import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminHome from "./pages/Admin/AdminHome";
import AddProduct from "./pages/Admin/products/AddProduct";
import ViewProducts from "./pages/Admin/products/ViewProducts";
import AdminCartList from "./pages/Admin/cart/AdminCartList"
import Navbar from "./pages/Admin/navbar/Navbar";


import UserRegister from "./pages/User/UserRegister";
import UserLogin from "./pages/User/UserLogin";
import UserDashboard from "./pages/User/UserDashboard";
import CategoryProducts from "./pages/User/product/CategoryProducts";
import UserNavbar from "./pages/User/navbar/UserNavbar";

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
      <AppContent
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
      />
    </Router>
  );
}

function AppContent({
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  isUserLoggedIn,
  setIsUserLoggedIn,
}) {
  const location = useLocation();

  const hideNavbarOnRoutes = ["/admin", "/admin-register", "/user", "/user-register"];
  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);

  return (
    <>
      {/* Navbar rendering */}
      {!shouldHideNavbar && isAdminLoggedIn && (
        <Navbar isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} />
      )}
      {!shouldHideNavbar && isUserLoggedIn && !isAdminLoggedIn && (
        <UserNavbar isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />
      )}

      <Routes>
        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
        <Route path="/admin-register" element={<AdminRegister />} />

        <Route path="/admin-home" element={
          isAdminLoggedIn ? <AdminHome /> : <AccessDenied />
        } />

        <Route path="/admin/add-product" element={
          isAdminLoggedIn ? <AddProduct /> : <AccessDenied />
        } />

        <Route path="/admin/products" element={
          isAdminLoggedIn ? <ViewProducts /> : <AccessDenied />
        } />

        <Route path="/admin/cart-list" element={
          isAdminLoggedIn ? <AdminCartList /> : <AccessDenied />
        } />

        {/* USER ROUTES */}
        <Route path="/user" element={<UserLogin setIsUserLoggedIn={setIsUserLoggedIn} />} />
        <Route path="/user-register" element={<UserRegister />} />

        <Route path="/user-dashboard" element={
          isUserLoggedIn ? <UserDashboard /> : <AccessDenied />
        } />

        <Route path="/category/:categoryName" element={
          isUserLoggedIn ? <CategoryProducts /> : <AccessDenied />
        } />

        {/* FALLBACK ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

// Reusable Access Denied component
function AccessDenied() {
  return <p className="text-center mt-5 text-danger">🚫 Access Denied</p>;
}

// Reusable 404 component
function NotFound() {
  return <p className="text-center mt-5 text-warning">⚠️ Page not found</p>;
}
