import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getRequests = async (params = {}) => {
	const response = await axios.get(`${API_URL}/requests`, { params });
	return {
		data: response.data.requests, // Обратите внимание на .requests
		totalPages: response.data.totalPages, // Используем готовое значение с сервера
	};
};
