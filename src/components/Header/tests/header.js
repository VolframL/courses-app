import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import Header from '../Header';
import { mockedStore } from 'mockedStore';
console.log(mockedStore.getState());

test('Header test', async () => {
	render(
		<Provider store={mockedStore}>
			<Header user={mockedStore.getState().user} onLogout={() => {}} />
		</Provider>
	);

	// expect(screen.queryByText('Vitalii')).toBeInTheDocument();
});
