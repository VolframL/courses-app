import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import CourseForm from 'components/CourseForm/CourseForm';
import Registration from 'components/Registration/Registration';
import Login from 'components/Login/Login';
import PrivateRouter from 'components/PrivateRouter/PrivateRouter';

import { getUser } from 'store/selectors';

import { mockedCoursesList } from './constants';

import './App.scss';
import useCoursesService from 'services';
import { setAuthors } from 'store/authors/actionCreators';
import { setCourses } from 'store/courses/actionCreators';
import { useAppDispatch } from 'store/index';

const App: FC = () => {
	const dispatch = useAppDispatch();
	const { fetchAllCourses, fetchAllAuthors } = useCoursesService();

	const navigate = useNavigate();
	const { pathname } = useLocation();
	const user = useSelector(getUser);

	useEffect(() => {
		fetchAllCourses().then(({ result }) => dispatch(setCourses(result)));
		fetchAllAuthors().then(({ result }) => dispatch(setAuthors(result)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
			{/* <PrivateRouter> */}
			<main className={'main'}>
				<Routes>
					<Route path='/courses' element={<Courses />} />
					<Route
						path='/courses/:courseId'
						element={<CourseInfo mockedCoursesList={mockedCoursesList} />}
					/>
					<Route path='/courses/add' element={<CourseForm />} />
				</Routes>
			</main>
		</div>
	);
};

export default App;
