import { SET_ORDERS, SET_ORDERS_ERROR } from "./orderActions";

const initialState = {
  orders: [],
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case SET_ORDERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
