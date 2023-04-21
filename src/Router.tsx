import React, { FC, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Courses from 'components/Courses';
import CourseInfo from 'components/CourseInfo';
import CourseForm from 'components/CourseForm';
import Registration from 'components/Registration';
import Login from 'components/Login';
import PrivateRouter from 'components/PrivateRouter';
import Page404 from 'components/Page404';

import { useAppDispatch } from 'store/index';
import { login } from 'store/user/reducer';
import { fetchMe } from 'store/user/thunk';
import { UserState } from 'types';

const Router: FC<{ user: UserState }> = ({ user }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { isAuth, role, token } = user;

	const checkStorage = () => {
		const token = window.localStorage.getItem('token');
		if (!token) {
			pathname === '/' || pathname === '/courses'
				? navigate('/login')
				: navigate(pathname);
		} else {
			dispatch(login(token));
			dispatch(fetchMe())
				.then(() => {
					pathname === '/' ? navigate('/courses') : navigate(pathname);
				})
				.catch((e) => {
					window.localStorage.removeItem('token');
					console.log('old token' + e);
				});
		}
	};

	useEffect(() => {
		if (!isAuth) {
			checkStorage();
		} else if (isAuth) {
			pathname === '/' ? navigate('/courses') : navigate(pathname);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<Routes>
			<Route path='/' element={<Courses role={role} token={token} />} />
			<Route path='/login' element={<Login />} />
			<Route path='/registration' element={<Registration />} />
			<Route
				path='/courses'
				element={isAuth ? <Courses role={role} token={token} /> : <Login />}
			/>
			<Route path='/courses/:courseId' element={<CourseInfo />} />
			<Route
				path='/courses/add'
				element={
					<PrivateRouter role={role}>
						<CourseForm />
					</PrivateRouter>
				}
			/>
			<Route
				path='/courses/update/:courseId'
				element={
					<PrivateRouter role={role}>
						<CourseForm />
					</PrivateRouter>
				}
			/>
			<Route path='*' element={<Page404 />} />
		</Routes>
	);
};

export default Router;
