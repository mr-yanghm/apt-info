import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/js/all.js";
import "./index.css";
import App from "./app";
import OpenAPI_APT from "./service/dataApi";
import AuthService from './service/auth_service';

const openApi = new OpenAPI_APT();
const authService = new AuthService();

ReactDOM.render(
  <React.StrictMode>
    <App openApi={openApi}
      authService={authService} />
  </React.StrictMode>,
  document.getElementById("root")
);
