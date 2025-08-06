import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App/App";
import { CssBaseline } from "@mui/material";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
