import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { AppProvider } from "./context/AppContext"; // ✅ Import AppProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <AppProvider> {/* ✅ Bọc toàn bộ App trong AppProvider */}
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
