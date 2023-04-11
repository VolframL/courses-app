import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { FC, useEffect } from 'react';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import CourseForm from 'components/CourseForm/CourseForm';
import Registration from 'components/Registration/Registration';
import Login from 'components/Login/Login';
import PrivateRouter from 'components/PrivateRouter/PrivateRouter';
import Page404 from 'components/Page404/Page404';

import { mockedCoursesList } from './constants';

import './App.scss';
import { useAppDispatch, useAppSelector } from 'store/index';
import { login } from 'store/user/reducer';
import { fetchMe } from 'store/user/thunk';
import { getUser } from 'store/selectors';

const App: FC = () => {
	const dispatch = useAppDispatch();
	const { isAuth } = useAppSelector(getUser);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const checkStorage = () => {
		const localStorage = window.localStorage.getItem('courses');
		if (!localStorage) {
			pathname === '/' || pathname === '/courses'
				? navigate('/login')
				: navigate(pathname);
		} else {
			dispatch(login(JSON.parse(localStorage)));
			const token = JSON.parse(localStorage).result;
			dispatch(fetchMe(token)).then(() => {
				pathname === '/' ? navigate('/courses') : navigate(pathname);
			});
		}
	};

	useEffect(() => {
		if (!isAuth) {
			checkStorage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<div className={'app'}>
			<Header />

			<main className={'main'}>
				<Routes>
					<Route path='/' element={<Courses />} />
					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/courses' element={isAuth ? <Courses /> : <Login />} />
					<Route
						path='/courses/:courseId'
						element={<CourseInfo mockedCoursesList={mockedCoursesList} />}
					/>
					<Route
						path='/courses/add'
						element={
							<PrivateRouter>
								<CourseForm />
							</PrivateRouter>
						}
					/>
					<Route
						path='/courses/update/:courseId'
						element={
							<PrivateRouter>
								<CourseForm />
							</PrivateRouter>
						}
					/>
					<Route path='*' element={<Page404 />} />
				</Routes>
			</main>
		</div>
	);
};

export default App;
