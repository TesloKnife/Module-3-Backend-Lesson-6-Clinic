import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getRequests = async () => {
	const response = await axios.get(`${API_URL}/requests`);
	return response.data;
};
