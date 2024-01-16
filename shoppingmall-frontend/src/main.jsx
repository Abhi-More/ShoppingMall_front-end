import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextApi from "./ContextApi/ContextApi.jsx";
import { CartProvider } from './ContextApi/Cart.jsx';
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextApi>
    <CartProvider>
      <App />
    </CartProvider>
  </ContextApi>
);
