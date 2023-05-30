import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Courses from 'components/Courses/Courses';
import { mockedStore, mockedStoreWithputCourses } from 'mockedStore';

describe('Courses test', () => {
	const state = mockedStore.getState();

	const { role, token } = state.user;
	const coursesList = state.courses;

	test('Amount of CourseCard equal length of courses array', () => {
		const component = (
			<MemoryRouter>
				<Provider store={mockedStore}>
					<Courses role={role} token={token} />
				</Provider>
			</MemoryRouter>
		);

		const { container } = render(component);
		const courses = container.querySelectorAll('.course-card-wrappe');

		expect(courses.length).toEqual(coursesList.length);
	});

	// Не зробив
	// test('Courses should display Empty container if courses array length is 0', () => {
	// 	const component = (
	// 		<MemoryRouter>
	// 			<Provider store={mockedStoreWithputCourses}>
	// 				<Courses role={role} token={token} />
	// 			</Provider>
	// 		</MemoryRouter>
	// 	);

	// 	const { container } = render(component);
	// 	const coursesWrapper = container.querySelector('.wrapper');

	// 	expect(coursesWrapper.textContent).toBe('The list of courses is empty');
	// });
});
