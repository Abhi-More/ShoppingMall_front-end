import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ContextApi from "./ContextApi/ContextApi.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextApi>
    <App />
  </ContextApi>
);
