import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from "./App";

import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
