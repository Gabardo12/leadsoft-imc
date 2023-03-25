import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
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
