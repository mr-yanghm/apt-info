import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/js/all.js";
import "./index.css";
import App from "./app";
import OpenAPI_APT from "./service/dataApi";

const openApi = new OpenAPI_APT();

ReactDOM.render(
  <React.StrictMode>
    <App openApi={openApi} />
  </React.StrictMode>,
  document.getElementById("root")
);
