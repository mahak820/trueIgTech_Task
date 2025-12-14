import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { StrictMode } from "react";

import App from "./App.jsx";
import store from "./store.js"; // ✅ store import

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ✅ Redux store ko Provider ke through App tak pahuncha rahe hain */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
