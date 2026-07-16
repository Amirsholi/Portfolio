import React from "react";
import { createRoot } from "react-dom/client";
import { App, SampleXProductPage } from "./App.jsx";
import { SampleXAdmin } from "./SampleXAdmin.jsx";
import { SampleXLegal } from "./SampleXLegal.jsx";
import "./styles.css";
import "./samplex-admin.css";

if (window.location.pathname === "/" && ["#samplex", "#buy-samplex"].includes(window.location.hash)) {
  window.history.replaceState(null, "", "/samplex");
}

const isSampleXAdmin = window.location.pathname.replace(/\/$/, "") === "/admin/samplex";
const legalMatch = window.location.pathname.match(/^\/samplex\/(privacy|terms|refunds|support)\/?$/);
const isSampleXProduct = /^\/samplex(?:\/success)?\/?$/.test(window.location.pathname);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isSampleXAdmin ? <SampleXAdmin /> : legalMatch ? <SampleXLegal page={legalMatch[1]} /> : isSampleXProduct ? <SampleXProductPage /> : <App />}
  </React.StrictMode>,
);
