import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { FC, useState, useEffect } from 'react';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import CreateCourse from 'components/CreateCourse/CreateCourse';
import Registration from 'components/Registration/Registration';
import Login from 'components/Login/Login';

import { mockedAuthorsList, mockedCoursesList } from './constants';

import './App.scss';

const App: FC = () => {
	const [userName, setUserName] = useState<string>('');
	const navigate = useNavigate();
	let { pathname } = useLocation();

	const getToken = () => {
		const token = window.localStorage.getItem('token-courses');
		if (token) {
			const userName: string = JSON.parse(token).user.name;
			setUserName(userName);
			pathname === '/' ? navigate('/courses') : navigate(pathname);
		}
	};

	useEffect(() => {
		getToken();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={'app'}>
			<Header userName={userName} setUserName={setUserName} />
			<main className={'main'}>
				<Routes>
					{userName ? (
						<>
							<Route
								path='/courses'
								element={<Courses mockedCoursesList={mockedCoursesList} />}
							/>
							<Route
								path='/courses/:courseId'
								element={<CourseInfo mockedCoursesList={mockedCoursesList} />}
							/>
							<Route
								path='/courses/add'
								element={
									<CreateCourse
										mockedAuthorsList={mockedAuthorsList}
										mockedCoursesList={mockedCoursesList}
									/>
								}
							/>
						</>
					) : (
						<>
							<Route path='/registration' element={<Registration />} />
							<Route
								path='/'
								element={
									<Login userName={userName} setUserName={setUserName} />
								}
							/>
							<Route
								path='/login'
								element={
									<Login userName={userName} setUserName={setUserName} />
								}
							/>
						</>
					)}
				</Routes>
			</main>
		</div>
	);
};

export default App;
