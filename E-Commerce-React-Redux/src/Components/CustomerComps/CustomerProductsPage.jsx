import React from "react";
import { Box, Grid } from "@mui/material";
import ProductList from "./ProductList"; // Import your product list
import Cart from "./Cart"; // Import your cart

const CustomerProductsPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
      {/* Left side: Cart */}
      <Box sx={{ width: "30%" }}>
        <Cart />
      </Box>

      {/* Right side: Products */}
      <Box sx={{ width: "70%" }}>
        <ProductList />
      </Box>
    </Box>
  );
};

export default CustomerProductsPage;
