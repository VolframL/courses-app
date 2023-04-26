import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import Login from '../Login';
import { mockedStore } from 'mockedStore';

test('Header test', async () => {
	render(
		<Provider store={mockedStore}>
			<Login />
		</Provider>
	);

	// expect(screen.queryByText('Vitalii')).toBeInTheDocument();
});
