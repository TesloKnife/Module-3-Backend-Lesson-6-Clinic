import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const submitRequest = async (data) => {
	const response = await axios.post(`${API_URL}/requests`, data);
	return response.data; // Возвращаем ответ сервера
};
