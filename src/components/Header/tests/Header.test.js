import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Header from '../Header';
import { mockedStore } from 'mockedStore';

const component = (
	<MemoryRouter>
		<Provider store={mockedStore}>
			<Header user={mockedStore.getState().user} />
		</Provider>
	</MemoryRouter>
);

describe('Header test', () => {
	test('Name is displayed', async () => {
		const { queryByText } = await render(component);

		const name = queryByText('Test Name');
		expect(name).toBeInTheDocument();
	});

	test('Logo is displayed', async () => {
		const { getByAltText } = await render(component);

		const logo = getByAltText('logo');
		expect(logo).toHaveAttribute('src');
	});
});
