import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Assuming App is your main component

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
