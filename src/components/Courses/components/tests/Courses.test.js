import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Courses from 'components/Courses/Courses';
import { mockedStore } from 'mockedStore';

describe('Courses test', () => {
	const state = mockedStore.getState();

	const { role, token } = state.user;
	const coursesList = state.courses;

	const component = (
		<MemoryRouter>
			<Provider store={mockedStore}>
				<Courses role={role} token={token} />
			</Provider>
		</MemoryRouter>
	);

	test('Amount of CourseCard equal length of courses array', () => {
		const { container } = render(component);
		const courses = container.querySelectorAll('.course-card-wrapper');

		expect(courses.length).toEqual(coursesList.length);
	});

	test('Courses should display Empty container if courses array length is 0', () => {
		const { container } = render(component);
		const coursesWrapper = container.querySelector('.wrapper');

		expect(coursesWrapper.textContent).toBe('The list of courses is empty');
	});
});
