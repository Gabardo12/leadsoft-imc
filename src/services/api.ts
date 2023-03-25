import axios from "axios";

const api = axios.create({
	baseURL: "http://peopletest.leadsoft.inf.br/api/v1",
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods":
			"GET, POST, PATCH, PUT, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
	},
});

export default api;
