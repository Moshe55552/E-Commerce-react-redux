import React from "react";
import { Box, Container } from "@mui/material";
import Cart from "./Cart";
import ProductList from "./ProductList";

const ProductsCustomers = () => {
  return (
    <Container sx={{ p: 3 }}>
      <Box sx={{ display: "flex" }}>
        {/* Left Side: ProductList taking most of the screen */}
        <Box sx={{ width: "70%" }}>
          <ProductList />
        </Box>

        {/* Right Side: Cart */}
        <Box sx={{ width: "30%", ml: 2 }}>
          <Cart />
        </Box>
      </Box>
    </Container>
  );
};

export default ProductsCustomers;
