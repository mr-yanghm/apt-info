import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/js/all.js";
import "./index.css";
import App from "./app";
import OpenAPI_APT from "./service/dataApi";
import AuthService from "./service/auth_service";
import AptService from "./service/apt_service";
import axios from "axios";

const openApi = new OpenAPI_APT();
const aptService = new AptService();
const authService = new AuthService();

ReactDOM.render(
  <React.StrictMode>
    <App openApi={openApi} authService={authService} aptService={aptService} />
  </React.StrictMode>,
  document.getElementById("root")
);
