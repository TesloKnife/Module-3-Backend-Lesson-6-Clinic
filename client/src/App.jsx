import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { RequestForm } from './pages';

const Page = styled.div``;

export const App = () => {
	return (
		<Page>
			<Routes>
				<Route path="/" element={<RequestForm />}></Route>
			</Routes>
		</Page>
	);
};
