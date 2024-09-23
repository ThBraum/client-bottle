import axios from "axios";

const API_URL = process.env.VITE_BACKEND_HOST || "http://localhost:7071";

export const login = async (username, password) => {
	const formData = new URLSearchParams();
	formData.append("username", username);
	formData.append("password", password);

	console.log(`${API_URL}/auth/login/`);
	console.log(`FormData: ${formData}`);

	const response = await axios.post(`${API_URL}/auth/login/`, formData, {
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
	});

	console.log(`response status: ${response.status}`);
	console.log(`response data: ${response.data}`);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Falha na autenticação");
	}
};

export const fetchCurrentUser = async () => {
	const token = localStorage.getItem("access_token");
	console.log(`token: ${token}`);

	try {
		const response = await axios.get(`${API_URL}/auth/me/`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		console.log(`response /me/: ${response}`);

		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		if (error.response && error.response.status === 401) {
			console.error("Token expirado ou inválido, redirecionando para login...");
			return null;
		}
		throw new Error("Falha ao buscar usuário");
	}
};

export const recoverPassword = async (email) => {
	const response = await axios.post(`${API_URL}/user/recover-password/`, { email });
	console.log(`response recover-password: ${response}`);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Falha ao recuperar senha");
	}
};
