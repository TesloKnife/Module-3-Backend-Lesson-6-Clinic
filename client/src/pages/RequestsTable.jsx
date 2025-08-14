import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRequests } from '../api/requests';

const RequestsTableContainer = ({ className }) => {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const perPage = 10;

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const response = await getRequests({
					page: currentPage,
					limit: perPage,
				});
				console.log(response);
				setRequests(response.data);
				setTotalPages(response.totalPages);
			} catch (err) {
				setError('Не удалось загрузить заявки');
			} finally {
				setLoading(false);
			}
		};

		fetchRequests();
	}, [currentPage]);

	if (loading) return <div className={className}>Загрузка...</div>;
	if (error) return <div className={className}>{error}</div>;

	return (
		<div className={className}>
			<h2>Список заявок</h2>

			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>ФИО</th>
							<th>Телефон</th>
							<th>Проблема</th>
							<th>Дата создания</th>
						</tr>
					</thead>
					<tbody>
						{requests.map((request) => (
							<tr key={request._id}>
								<td>{request.fullName}</td>
								<td>{request.phone}</td>
								<td>{request.problem || '-'}</td>
								<td>{new Date(request.createdAt).toLocaleString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="pagination">
				<button
					disabled={currentPage === 1}
					onClick={() => setCurrentPage((p) => p - 1)}
				>
					Назад
				</button>

				<span>
					Страница {currentPage} из {totalPages}
				</span>

				<button
					disabled={currentPage === totalPages}
					onClick={() => setCurrentPage((p) => p + 1)}
				>
					Вперед
				</button>
			</div>
		</div>
	);
};

export const RequestTable = styled(RequestsTableContainer)`
	padding: 2rem;

	h2 {
		color: #2c3e50;
		margin-bottom: 1.5rem;
	}

	.table-container {
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 1rem;
		text-align: left;
		border-bottom: 1px solid #eee;
	}

	th {
		background-color: #f8f9fa;
		font-weight: 500;
	}

	tr:hover {
		background-color: #f5f5f5;
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-top: 1.5rem;

		button {
			padding: 0.5rem 1rem;
			background: #3498db;
			color: white;
			border: none;
			border-radius: 4px;
			cursor: pointer;

			&:disabled {
				background: #95a5a6;
				cursor: not-allowed;
			}
		}
	}
`;
