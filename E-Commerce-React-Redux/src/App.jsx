import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import Categories from "./Components/AdminComps/Categories";
import Customers from "./Components/AdminComps/Customers";
import Statistics from "./Components/AdminComps/Statistics";
import Products from "./Components/AdminComps/Products";
import MyAccount from "./Components/CustomerComps/MyAccount";
import MyOrders from "./Components/CustomerComps/MyOrders";
import Cart from "./Components/CustomerComps/Cart";
import Customer from "./Components/Customer";
import ProductList from "./Components/CustomerComps/ProductList";
import CustomerProductsPage from "./Components/CustomerComps/CustomerProductsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="customers" element={<Customers />} />
          <Route path="categories" element={<Categories />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="/customer" element={<Customer />}>
          <Route path="/customer/myaccount" element={<MyAccount />} />
          <Route path="/customer/myorders" element={<MyOrders />} />
          <Route path="/customer/cart" element={<CustomerProductsPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
