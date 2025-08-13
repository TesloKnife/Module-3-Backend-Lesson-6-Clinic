import { useEffect, useState } from 'react';
import styled from 'styled-components';

const PhoneInputContainer = ({ className, value, onChange }) => {
	const [displayValue, setDisplayValue] = useState('');

	useEffect(() => {
		// Оставляем только цифры
		let cleaned = value.replace(/\D/g, '');

		// Если номер начинается не с 8, заменяем первую цифру на 8
		if (cleaned.length > 0 && cleaned[0] !== '8') {
			cleaned = '8' + cleaned.substring(1);
		}

		// Ограничиваем длину 11 цифрами (8 + 10)
		cleaned = cleaned.substring(0, 11);

		// Форматируем номер для отображения: 8 (123) 456-78-90
		let formatted = '';
		if (cleaned.length > 0) formatted = cleaned[0]; // 8
		if (cleaned.length > 1) formatted += ` (${cleaned.substring(1, 4)}`;
		if (cleaned.length > 4) formatted += `) ${cleaned.substring(4, 7)}`;
		if (cleaned.length > 7) formatted += `-${cleaned.substring(7, 9)}`;
		if (cleaned.length > 9) formatted += `-${cleaned.substring(9, 11)}`;

		setDisplayValue(formatted);
	}, [value]);

	// Обработчик изменения значения
	const handleChange = (e) => {
		// Очищаем ввод от нецифровых символов
		let input = e.target.value.replace(/\D/g, '');

		// Если номер начинается не с 8, заменяем первую цифру на 8
		if (input.length > 0 && input[0] !== '8') {
			input = '8' + input.substring(1);
		}

		// Ограничиваем длину 11 цифрами (8 + 10)
		input = input.substring(0, 11);

		// Передаём значение в родительский компонент
		onChange(input);
	};

	// Обработчик вставки из буфера обмена
	const handlePaste = (e) => {
		e.preventDefault();
		const pastedText = e.clipboardData.getData('text/plain').replace(/\D/g, '');

		let cleaned = pastedText;
		// Если вставленный номер начинается не с 8, заменяем первую цифру на 8
		if (cleaned.length > 0 && cleaned[0] !== '8') {
			cleaned = '8' + cleaned.substring(1);
		}

		// Ограничиваем длину 11 цифрами (8 + 10)
		cleaned = cleaned.substring(0, 11);

		// Передаём значение в родительский компонент
		onChange(cleaned);
	};

	return (
		<input
			className={className}
			type="text"
			value={displayValue}
			onChange={handleChange}
			onPaste={handlePaste}
			placeholder="8 (123) 456-78-90"
		/>
	);
};

export const PhoneInput = styled(PhoneInputContainer)`
	width: 100%;
	padding: 0.75rem;
	border: 1px solid ${(props) => (props.$hasError ? '#e74c3c' : '#ddd')};
	border-radius: 5px;
	font-size: 1rem;
	transition: border-color 0.3s;

	&:focus {
		outline: none;
		border-color: #3498db;
		box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
	}

	&::placeholder {
		color: #95a5a6;
	}
`;
