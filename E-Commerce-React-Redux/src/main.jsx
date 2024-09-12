// src/main.jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./Reducers/rootReducer.js";

// Create the Redux store using configureStore
const store = configureStore({
  reducer: rootReducer,
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
