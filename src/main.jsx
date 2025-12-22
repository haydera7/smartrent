import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Header from "./components/Header.jsx";
import "./index.css"; // ✅ THIS IMPORT IS REQUIRED

ReactDOM.createRoot(document.getElementById("root")).render(
 <BrowserRouter>

    <App />
  </BrowserRouter>
);
