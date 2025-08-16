import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentOperator } from '../api/auth';

export const PrivateRoute = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const operator = await getCurrentOperator();
				if (!operator) {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		checkAuth();
	}, [navigate]);

	return children;
};
