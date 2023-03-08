import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CreateCourse from 'components/CreateCourse/CreateCourse';
import './App.css';
import { useState } from 'react';

function App() {
	const [page, setPage] = useState('courses');

	const onSetPageAddCourse = () => {
		setPage('createCourse');
	};

	return (
		<div className='app'>
			<Header />
			{page === 'courses' ? (
				<Courses onSetPageAddCourse={onSetPageAddCourse} />
			) : (
				<CreateCourse />
			)}
		</div>
	);
}

export default App;
