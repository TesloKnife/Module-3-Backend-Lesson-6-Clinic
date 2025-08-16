import { NavLink } from 'react-router-dom';
import { useAuth } from '../context';
import styled from 'styled-components';

const NavigationBarContainer = ({ className }) => {
	const { operator, loading, handleLogout } = useAuth();

	if (loading) return null;

	return (
		<div className={className}>
			<nav>
				<ul>
					<li>
						<NavLink to="/" end>
							Запись к врачу
						</NavLink>
					</li>
					{operator && (
						<li>
							<NavLink to="/requests">Таблица заявок</NavLink>
						</li>
					)}
					<li className="spacer"></li>
					{operator ? (
						<>
							<li className="operator-name">{operator.name}</li>
							<li>
								<button className="logout-btn" onClick={handleLogout}>
									Выход
								</button>
							</li>
						</>
					) : (
						<li>
							<NavLink to="/login">Авторизация</NavLink>
						</li>
					)}
				</ul>
			</nav>
		</div>
	);
};

export const NavigationBar = styled(NavigationBarContainer)`
	background: #2c3e50;
	padding: 1rem 2rem;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	nav ul {
		display: flex;
		gap: 1.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
		align-items: center;
	}

	nav a,
	nav button {
		color: white;
		text-decoration: none;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		transition: all 0.2s;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		font-family: inherit;

		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}
	}

	nav a.active {
		background-color: #3498db;
	}

	.spacer {
		flex-grow: 1;
	}

	.operator-name {
		color: #ecf0f1;
		font-weight: 500;
		padding: 0.5rem 0;
	}

	.logout-btn {
		background-color: #e74c3c;
		padding: 0.5rem 1.5rem;

		&:hover {
			background-color: #c0392b;
		}
	}

	@media (max-width: 768px) {
		padding: 0.75rem 1rem;

		nav ul {
			gap: 0.75rem;
			flex-wrap: wrap;
		}

		.spacer {
			display: none;
		}

		.operator-name {
			order: 1;
			width: 100%;
			text-align: right;
			padding-right: 0;
		}

		.logout-btn {
			order: 2;
		}
	}
`;
