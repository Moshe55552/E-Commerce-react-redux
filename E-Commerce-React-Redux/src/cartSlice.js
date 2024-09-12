// src/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    message: "", // Added for displaying messages
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity = quantity;
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    completeOrderStart: (state) => {
      state.message = "Processing your order...";
    },
    completeOrderSuccess: (state) => {
      state.items = []; // Clear cart items
      state.totalPrice = 0; // Reset total price
      state.message = "Thank you for your order!";
    },
    completeOrderFailure: (state, action) => {
      state.message =
        action.payload || "Error completing your order. Please try again.";
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  completeOrderStart,
  completeOrderSuccess,
  completeOrderFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
