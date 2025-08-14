import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Login, RequestForm, RequestTable } from './pages';

const Page = styled.div``;

export const App = () => {
	return (
		<Page>
			<Routes>
				<Route path="/" element={<RequestForm />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/requests" element={<RequestTable />}></Route>
			</Routes>
		</Page>
	);
};
