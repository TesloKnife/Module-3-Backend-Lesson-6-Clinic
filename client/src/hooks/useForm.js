import { useState } from 'react';

export const useForm = (initialValues, validate) => {
	// Текущие значения формы
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});

	// Cброс формы
	const resetForm = () => {
		setValues(initialValues);
		setErrors({});
	};

	// Обработка изменений полей формы
	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	// Обработка отправка формы
	const handleSubmit = (callback) => (e) => {
		e.preventDefault();
		const validationErrors = validate(values);
		setErrors(validationErrors);

		// Если нет ошибок - вызываем callback
		if (Object.keys(validationErrors).length === 0) {
			callback(values);
		}
	};
	return { values, errors, handleChange, handleSubmit, resetForm };
};
