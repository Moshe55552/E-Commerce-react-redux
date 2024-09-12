// src/components/MyOrders.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../ordersSlice";
import DynamicTable from "../DynamicTable";

const MyOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const error = useSelector((state) => state.orders.error);
  const [userId, setUserId] = useState("user123"); // Example user ID

  useEffect(() => {
    console.log(`Dispatching fetchOrders with userId: ${userId}`);
    const unsubscribe = dispatch(fetchOrders(userId));

    return () => {
      if (unsubscribe) {
        console.log("Cleaning up fetchOrders listener");
        unsubscribe();
      }
    };
  }, [dispatch, userId]);

  console.log("Orders from Redux:", orders);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {orders.length > 0 ? (
        <DynamicTable
          columns={["Product", "Quantity", "Total", "Date"]}
          data={orders.map((order) => ({
            Product: order.product || "N/A",
            Quantity: order.quantity || 0,
            Total: order.total || 0,
            Date: new Date(order.date).toLocaleString() || "N/A",
          }))}
        />
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default MyOrders;
