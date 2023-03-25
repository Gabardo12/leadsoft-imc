import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import Peoples from "../pages/Peoples";
import api from "./api";

export default function WebRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					path="/"
					element={
						<PrivateRoute>
							<Peoples />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

function PrivateRoute({ children }: any) {
	const token = localStorage.getItem("@leadsoft:Authorization");

	if (token) {
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		return children;
	}

	return <Navigate to="/login" />;
}
