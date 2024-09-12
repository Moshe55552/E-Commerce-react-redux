import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase auth

const Customer = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent the default link behavior
    try {
      await signOut(auth); // Sign out the user from Firebase
      console.log("User logged out successfully");
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "250px" }}>
      <h2>Welcome Back, Customer!</h2>
      <div style={{ marginBottom: "80px" }}>
        <Link to="myaccount" style={{ margin: "0 15px" }}>
          My Account
        </Link>
        <Link to="myorders" style={{ margin: "0 15px" }}>
          My Orders
        </Link>
        <Link to="cart" style={{ margin: "0 15px" }}>
          Products
        </Link>
        {/* Add onClick to the Link to handle the logout */}
        <Link to="/login" onClick={handleLogout} style={{ margin: "0 15px" }}>
          Log Out
        </Link>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Customer;
