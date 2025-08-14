import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Login, RequestForm } from './pages';

const Page = styled.div``;

export const App = () => {
	return (
		<Page>
			<Routes>
				<Route path="/" element={<RequestForm />}></Route>
				<Route path="/login" element={<Login />}></Route>
			</Routes>
		</Page>
	);
};
