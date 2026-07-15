import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { SampleXAdmin } from "./SampleXAdmin.jsx";
import "./styles.css";
import "./samplex-admin.css";

const isSampleXAdmin = window.location.pathname.replace(/\/$/, "") === "/admin/samplex";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isSampleXAdmin ? <SampleXAdmin /> : <App />}
  </React.StrictMode>,
);
