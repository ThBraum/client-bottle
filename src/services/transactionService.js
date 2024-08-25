import axios from "axios";

const API_URL = process.env.VITE_BACKEND_HOST || "http://localhost:7071";

export const fetchTransactions = async (
	page = 1,
	size = 50,
	term = "",
	date_filter = "",
	token
) => {
	const params = { page, size };
	if (term) {
		params.term = term;
	}
	if (date_filter) {
		params.date_filter = date_filter;
	}

	try {
		const response = await axios.get(`${API_URL}/transaction/`, {
			params,
			headers: { Authorization: `Bearer ${token}` },
		});

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error("Falha ao buscar transações");
		}
	} catch (error) {
		console.error("Erro ao buscar transações:", error);
		throw error;
	}
};
