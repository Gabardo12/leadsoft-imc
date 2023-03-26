import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/global.css";
import "./assets/css/responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import WebRoutes from "./services/WebRoutes";
import { AuthProvider } from "./context/auth";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
      		<WebRoutes />
      		<ToastContainer />
		</AuthProvider>
	</React.StrictMode>
);
