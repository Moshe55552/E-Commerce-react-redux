// Remove this file or just this code from orderActions.js
export const SET_ORDERS = "SET_ORDERS";
export const SET_ORDERS_ERROR = "SET_ORDERS_ERROR";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("/api/orders");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      dispatch({ type: SET_ORDERS, payload: data });
    } catch (error) {
      dispatch({ type: SET_ORDERS_ERROR, payload: error.message });
    }
  };
};
