import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "250px" }}>
      <h2>Welcome Back Admin !</h2>
      <div style={{ marginBottom: "80px" }}>
        <Link to="categories" style={{ margin: "0 15px" }}>
          Categories
        </Link>
        <Link to="products" style={{ margin: "0 15px" }}>
          Products
        </Link>
        <Link to="customers" style={{ margin: "0 15px" }}>
          Customers
        </Link>
        <Link to="statistics" style={{ margin: "0 15px" }}>
          Statistics
        </Link>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
