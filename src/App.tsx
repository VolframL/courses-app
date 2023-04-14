import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { FC, useEffect } from 'react';

import Header from 'components/Header';
import Courses from 'components/Courses';
import CourseInfo from 'components/CourseInfo';
import CourseForm from 'components/CourseForm';
import Registration from 'components/Registration';
import Login from 'components/Login';
import PrivateRouter from 'components/PrivateRouter';
import Page404 from 'components/Page404';

import { mockedCoursesList } from './constants';

import './App.scss';
import { useAppDispatch, useAppSelector } from 'store/index';
import { login } from 'store/user/reducer';
import { fetchMe } from 'store/user/thunk';
import { getUser } from 'store/selectors';

const App: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const { isAuth, role, token, name } = useAppSelector(getUser);

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
			<Header userName={name} token={token} />

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
