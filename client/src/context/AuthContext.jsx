import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentOperator, logout } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [operator, setOperator] = useState(null);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const currentOperator = await getCurrentOperator();
				setOperator(currentOperator);
			} catch (error) {
				setOperator(null);
			} finally {
				setLoading(false);
			}
		};
		checkAuth();
	}, []);

	const handleLogout = async () => {
		try {
			await logout();
			setOperator(null);
			navigate('/');
		} catch (error) {
			console.error('Ошибка при выходе:', error);
		}
	};

	const handleLogin = (operatorData) => {
		setOperator(operatorData);
	};

	return (
		<AuthContext.Provider value={{ operator, loading, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
