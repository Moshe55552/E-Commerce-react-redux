// src/Reducers/rootReducer.js
import { combineReducers } from "redux";
import userReducer from "../userSlice";
import statisticsReducer from "./statisticsReducer";
import ordersReducer from "../ordersSlice";
import cartReducer from "../cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  statistics: statisticsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export default rootReducer;
