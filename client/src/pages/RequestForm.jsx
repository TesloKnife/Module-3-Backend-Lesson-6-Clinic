import { submitRequest } from '../api/request';
import { PhoneInput } from '../components/PhoneInput';
import { useForm } from '../hooks/useForm';
import { useState } from 'react';
import styled from 'styled-components';

const validate = (values) => {
	const errors = {};
	if (!values.fullName) errors.fullName = 'Обязательное поле';
	if (!values.phone || values.phone.length < 11)
		errors.phone = 'Введите корректный номер, начиная с 8';
	return errors;
};

const RequestFormContainer = ({ className }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
		{ fullName: '', phone: '', problem: '' }, // Начальные значения
		validate, // Функция валидации
	);

	// Обработчик отправки формы
	const onSubmit = async (formValues) => {
		setIsSubmitting(true);
		try {
			// Отправляем данные на сервер
			await submitRequest({
				...formValues,
				createdAt: new Date().toISOString(), // Добавляем дату создания
			});
			setSubmitSuccess(true);
			resetForm(); // Очистка формы после успешной отправки
			// Через 3 секунды скрываем сообщение об успехе
			setTimeout(() => setSubmitSuccess(false), 3000);
		} catch (error) {
			console.error('Ошибка отправки:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={className}>
			<h1 className="form-title">Запись к врачу</h1>
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label className="label">ФИО</label>
					<input
						className={`input ${errors.fullName ? 'error' : ''}`}
						name="fullName"
						value={values.fullName}
						onChange={handleChange}
					/>
					{errors.fullName && (
						<span className="error-message">{errors.fullName}</span>
					)}
				</div>

				<div className="form-group">
					<label className="label">Номер телефона</label>
					<PhoneInput
						value={values.phone}
						onChange={(value) =>
							handleChange({ target: { name: 'phone', value } })
						}
						$hasError={!!errors.phone}
					/>
					{errors.phone && (
						<span className="error-message">{errors.phone}</span>
					)}
				</div>

				<div className="form-group">
					<label className="label">Опишите вашу проблему</label>
					<textarea
						className="textarea"
						name="problem"
						value={values.problem}
						onChange={handleChange}
					/>
				</div>

				<button className="submit-button" type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Отправка...' : 'Отправить'}
				</button>

				{submitSuccess && (
					<div className="success-message">Заявка успешно отправлена!</div>
				)}
			</form>
		</div>
	);
};

export const RequestForm = styled(RequestFormContainer)`
	padding: 2rem;
	background-color: #f5f7fa;
	min-height: 100vh;

	.form-title {
		color: #2c3e50;
		text-align: center;
		margin-bottom: 2rem;
		font-size: 2rem;
	}

	.form {
		max-width: 500px;
		margin: 0 auto;
		padding: 2rem;
		background: #fff;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.label {
		display: block;
		margin-bottom: 0.5rem;
		color: #2c3e50;
		font-weight: 500;
	}

	.input,
	.textarea {
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

	.input.error {
		border-color: #e74c3c;
	}

	.textarea {
		font-family: inherit;
	}

	.submit-button {
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

	.error-message {
		display: block;
		margin-top: 0.5rem;
		color: #e74c3c;
		font-size: 0.875rem;
	}

	.success-message {
		margin-top: 1.5rem;
		padding: 0.75rem;
		background-color: #2ecc71;
		color: white;
		border-radius: 5px;
		text-align: center;
	}
`;
