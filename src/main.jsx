
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.css";
import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.js";
import "./index.css";
import App from "./App.jsx";

if (window.jalaliDatepicker) {
  window.jalaliDatepicker.startWatch({
    targetValueInput: "attr",
    targetValueType: "attr",
    persianDigits: true,
    autoReadOnlyInput: false,
    position: "right",
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
