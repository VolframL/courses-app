import { useState } from 'react';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CreateCourse from 'components/CreateCourse/CreateCourse';

import { mockedAuthorsList, mockedCoursesList } from 'constants';

import './App.css';

function App() {
	const [page, setPage] = useState('courses');

	const onSetPage = (page) => {
		setPage(page);
	};

	return (
		<div className='app'>
			<Header />
			{page === 'courses' ? (
				<Courses
					onSetPage={onSetPage}
					mockedAuthorsList={mockedAuthorsList}
					mockedCoursesList={mockedCoursesList}
				/>
			) : (
				<CreateCourse
					onSetPage={onSetPage}
					mockedAuthorsList={mockedAuthorsList}
					mockedCoursesList={mockedCoursesList}
				/>
			)}
		</div>
	);
}

export default App;
