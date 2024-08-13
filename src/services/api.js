import axios from "axios";

const api = axios.create({
	baseURL: process.env.VITE_BACKEND_HOST,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("access_token");
		console.log(`token: ${token}`);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem("access_token");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default api;
