// src/ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const db = getFirestore();

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setOrders(state, action) {
      console.log("Updating orders in Redux:", action.payload);
      state.orders = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setOrders, setError } = ordersSlice.actions;

export const fetchOrders = (userId) => (dispatch) => {
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("userId", "==", userId));

  console.log("Setting up Firestore listener");

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      console.log("Firestore data received");
      let orders = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        orders.push({
          id: doc.id,
          ...data,
          date: data.date.toDate().toISOString(), // Ensure date is formatted correctly
        });
      });
      console.log("Orders after snapshot:", orders);
      dispatch(setOrders(orders));
    },
    (error) => {
      console.error("Error in onSnapshot:", error);
      dispatch(setError(error.message));
    }
  );

  return () => {
    console.log("Unsubscribing from Firestore listener");
    unsubscribe();
  };
};

export default ordersSlice.reducer;
