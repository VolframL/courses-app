import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Header from '../Header';
import { mockedStore } from 'mockedStore';

describe('Header test', () => {
	test('Name is displayed', async () => {
		const { queryByText } = await render(
			<MemoryRouter>
				<Provider store={mockedStore}>
					<Header user={mockedStore.getState().user} />
				</Provider>
			</MemoryRouter>
		);

		const name = queryByText('Test Name');
		expect(name).toBeInTheDocument();
	});

	test('Logo is displayed', async () => {
		const { getByAltText } = await render(
			<MemoryRouter>
				<Provider store={mockedStore}>
					<Header user={mockedStore.getState().user} />
				</Provider>
			</MemoryRouter>
		);

		const logo = getByAltText('logo');
		expect(logo).toHaveAttribute('src');
	});
});
