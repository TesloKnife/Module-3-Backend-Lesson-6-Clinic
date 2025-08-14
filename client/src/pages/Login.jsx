import { useState } from 'react';
import styled from 'styled-components';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginContainer = ({ className }) => {
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	// Обработка отправки формы
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const result = await login(credentials);
			if (result.success) {
				navigate('/'); // Поменять переход на таблицу с записями
			} else {
				setError(result.message || 'Ошибка авторизации');
			}
		} catch (error) {
			// Проверяем тип ошибки
			if (axios.isAxiosError(error)) {
				// Ошибка от сервера (например, 401 Unauthorized)
				if (error.response) {
					setError(error.response.data.message || 'Ошибка авторизации');
				} else {
					// Сетевая ошибка (нет соединения с сервером)
					setError('Ошибка соединения с сервером');
				}
			} else {
				// Другие ошибки
				setError('Произошла непредвиденная ошибка');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={className}>
			<h2>Вход для сотрудников</h2>

			{error && <div className="error-message">{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Email:</label>
					<input
						type="email"
						value={credentials.email}
						onChange={(e) =>
							setCredentials({
								...credentials,
								email: e.target.value,
							})
						}
						required
					/>
				</div>

				<div className="form-group">
					<label>Пароль:</label>
					<input
						type="password"
						value={credentials.password}
						onChange={(e) =>
							setCredentials({
								...credentials,
								password: e.target.value,
							})
						}
						required
					/>
				</div>

				<button type="submit" disabled={isLoading}>
					{isLoading ? 'Вход...' : 'Войти'}
				</button>
			</form>
		</div>
	);
};

export const Login = styled(LoginContainer)`
	padding: 2rem;
	background-color: #f5f7fa;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h2 {
		color: #2c3e50;
		text-align: center;
		margin-bottom: 2rem;
		font-size: 2rem;
	}

	.error-message {
		display: block;
		margin-bottom: 1.5rem;
		padding: 0.75rem;
		background-color: #e74c3c;
		color: white;
		border-radius: 5px;
		text-align: center;
		max-width: 500px;
		width: 100%;
	}

	form {
		max-width: 500px;
		width: 100%;
		margin: 0 auto;
		padding: 2rem;
		background: #fff;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		color: #2c3e50;
		font-weight: 500;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 5px;
		font-size: 1rem;
		transition: border-color 0.3s;

		&:focus {
			outline: none;
			border-color: #3498db;
			box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
		}
	}

	button {
		width: 100%;
		padding: 0.75rem;
		background-color: #3498db;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.3s;

		&:hover {
			background-color: #2980b9;
		}

		&:disabled {
			background-color: #95a5a6;
			cursor: not-allowed;
		}
	}

	@media (max-width: 600px) {
		padding: 1rem;

		form {
			padding: 1.5rem;
		}

		h2 {
			font-size: 1.5rem;
			margin-bottom: 1.5rem;
		}
	}
`;
