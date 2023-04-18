import { useNavigate } from 'react-router-dom';
import React, { FC } from 'react';

import Header from 'components/Header';
// import Courses from 'components/Courses';
// import CourseInfo from 'components/CourseInfo';
// import CourseForm from 'components/CourseForm';
// import Registration from 'components/Registration';
// import Login from 'components/Login';
// import PrivateRouter from 'components/PrivateRouter';
// import Page404 from 'components/Page404';

import Router from 'Router';

// import { mockedCoursesList } from './constants';

import './App.scss';
import { useAppDispatch, useAppSelector } from 'store/index';
import { logout } from 'store/user/reducer';
import { getUser } from 'store/selectors';
import useCoursesService from 'services';

const App: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { postLogout } = useCoursesService();

	const { token, name } = useAppSelector(getUser);

	const onLogout = () => {
		postLogout(token)
			.then(() => {
				dispatch(logout());
				navigate('/login');
			})
			.catch((e) => {
				console.log('Error logout ' + e);
			});
	};

	return (
		<div className={'app'}>
			<Header userName={name} token={token} onLogout={onLogout} />

			<main className={'main'}>
				{/* <Routes>
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
				</Routes> */}
				<Router />
			</main>
		</div>
	);
};

export default App;
