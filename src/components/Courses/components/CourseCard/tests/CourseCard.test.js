import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import CourseCard from '../CourseCard';
import { mockedStore } from 'mockedStore';

describe('Course Card test', () => {
	const state = mockedStore.getState();

	const { role, token } = state.user;
	const coursesList = state.courses;
	const course = coursesList[0];
	const authorList = state.authors;

	const component = (
		<MemoryRouter>
			<Provider store={mockedStore}>
				<CourseCard
					role={role}
					token={token}
					key={course.id}
					course={course}
					authorList={authorList}
					courseQuantity={coursesList.length}
				/>
			</Provider>
		</MemoryRouter>
	);

	test('Title is displayed', async () => {
		const { getByText } = await render(component);

		const title = getByText('title-of-course');
		expect(title).toBeInTheDocument();
	});

	test('Description is displayed', async () => {
		const { getByText } = await render(component);

		const description = getByText('description-of-course');
		expect(description).toBeInTheDocument();
	});

	test('Duration is displayed in the correct format', async () => {
		const { getByText } = await render(component);

		const duration = getByText(/duration/i).closest('div').textContent;

		const validFormat = /^duration: [0-9]{2}:[0-9]{2} hours$/i;
		expect(duration).toMatch(validFormat);
	});

	test('Author lost is displayed', async () => {
		const { getByText } = await render(component);

		const authorList = getByText(/authors/i).closest('div').textContent;

		const oneOrMoreAuthor = /\S{2,}/;
		expect(authorList).toMatch(oneOrMoreAuthor);
	});

	test('Creating date is displayed in the correct format', async () => {
		const { getByText } = await render(component);

		const creationDate = getByText(/created/i).closest('div').textContent;

		const validFormat = /^created: [0-3][0-9]\.[0-1][0-9]\.[2][0][0-2][0-9]$/i;
		expect(creationDate).toMatch(validFormat);
	});
});
