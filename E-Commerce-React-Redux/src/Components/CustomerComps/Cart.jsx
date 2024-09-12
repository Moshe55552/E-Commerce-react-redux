import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  removeFromCart,
  updateQuantity,
  completeOrderStart,
  completeOrderSuccess,
  completeOrderFailure,
} from "../../cartSlice";
import { updateProductSoldCountInFirebase } from "../../firebase"; // Import Firebase function

const Cart = () => {
  const { items, totalPrice, message } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) return; // Prevent setting quantity below 1
    dispatch(updateQuantity({ itemId, quantity }));
  };

  const handleOrder = async () => {
    dispatch(completeOrderStart()); // Set loading message
    try {
      // Update sold count for each item in the cart
      for (const item of items) {
        await updateProductSoldCountInFirebase(
          item.categoryId,
          item.id,
          item.quantity
        );
      }

      dispatch(completeOrderSuccess()); // Update state to indicate success
      alert("Thank you for your order!"); // Show confirmation
    } catch (error) {
      console.error("Error completing order:", error);
      dispatch(
        completeOrderFailure("Error completing your order. Please try again.")
      ); // Update state to indicate failure
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        border: "1px solid gray",
        borderRadius: "4px",
        p: 2,
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
        onClick={() => setOpen(!open)}
      >
        {open ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
      <Typography variant="h6" gutterBottom>
        Cart
      </Typography>
      <Collapse in={open}>
        <List>
          {items.length > 0 ? (
            items.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {item.title} - Qty: {item.quantity}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                  >
                    <RemoveCircleOutline />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    <AddCircleOutline />
                  </IconButton>
                  <Button
                    onClick={() => handleRemove(item.id)}
                    variant="outlined"
                    color="secondary"
                    sx={{ ml: 2 }}
                  >
                    Remove
                  </Button>
                </Box>
              </ListItem>
            ))
          ) : (
            <Typography>No items in the cart</Typography>
          )}
        </List>
        <Typography variant="h6" gutterBottom>
          Total: ${totalPrice.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleOrder}
        >
          Order
        </Button>
        {message && (
          <Typography sx={{ mt: 2, color: "green" }}>{message}</Typography>
        )}
      </Collapse>
    </Box>
  );
};

export default Cart;
