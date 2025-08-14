import axios from 'axios';

const API_URL = 'http://localhost:3000';

// работа с cookie
axios.defaults.withCredentials = true;

export const login = async (credentials) => {
	const response = await axios.post(`${API_URL}/auth/login`, credentials);

	return response.data;
};

export const getCurrentOperator = async () => {
	try {
		// Запрос к защищенному эндпоинту для проверки авторизации
		const response = await axios.get(`${API_URL}/auth/me`);
		return response.data.operator || null;
	} catch (error) {
		return null;
	}
};

export const logout = async () => {
	await axios.post(`${API_URL}/auth/logout`);
};
