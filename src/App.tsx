import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import CreateCourse from 'components/CreateCourse/CreateCourse';
import Registration from 'components/Registration/Registration';
import Login from 'components/Login/Login';

import { getUser } from 'store/selectors';

import { mockedCoursesList } from './constants';

import './App.scss';

const App: FC = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const user = useSelector(getUser);

	useEffect(() => {
		user.isAuth
			? pathname === '/'
				? navigate('/courses')
				: navigate(pathname)
			: navigate('/login');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!user.isAuth) {
		return (
			<div className={'app'}>
				<Header />
				<main className={'main'}>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/registration' element={<Registration />} />
					</Routes>
				</main>
			</div>
		);
	}

	return (
		<div className={'app'}>
			<Header />
			<main className={'main'}>
				<Routes>
					<Route path='/courses' element={<Courses />} />
					<Route
						path='/courses/:courseId'
						element={<CourseInfo mockedCoursesList={mockedCoursesList} />}
					/>
					<Route path='/courses/add' element={<CreateCourse />} />
				</Routes>
			</main>
		</div>
	);
};

export default App;
