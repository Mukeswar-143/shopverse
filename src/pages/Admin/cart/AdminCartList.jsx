import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get(
          "https://productcatlog-1.onrender.com/admin/carts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(res.data);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError("Failed to load cart items.");
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div
      className="admin-cart-container container"
      style={{ paddingTop: "100px" }}
    >
      <h2 className="text-center mb-4">Customer Cart Details</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      {cartItems.length === 0 && !error ? (
        <p className="text-center">No cart items found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Color</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.product?.pname}</td>
                  <td>₹{item.product?.price}</td>
                  <td>{item.product?.color || "-"}</td>
                  <td className="clamp-description">{item.product?.pdesc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCartList;
