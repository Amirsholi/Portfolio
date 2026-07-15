import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { SampleXAdmin } from "./SampleXAdmin.jsx";
import { SampleXLegal } from "./SampleXLegal.jsx";
import "./styles.css";
import "./samplex-admin.css";

const isSampleXAdmin = window.location.pathname.replace(/\/$/, "") === "/admin/samplex";
const legalMatch = window.location.pathname.match(/^\/samplex\/(privacy|terms|refunds|support)\/?$/);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isSampleXAdmin ? <SampleXAdmin /> : legalMatch ? <SampleXLegal page={legalMatch[1]} /> : <App />}
  </React.StrictMode>,
);
