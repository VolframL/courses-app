import React, { FC } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Courses from 'components/Courses';
import CourseInfo from 'components/CourseInfo';
import CourseForm from 'components/CourseForm';
import Registration from 'components/Registration';
import Login from 'components/Login';
import PrivateRouter from 'components/PrivateRouter';
import Page404 from 'components/Page404';

import { UserState } from 'types';

const Router: FC<{ user: UserState }> = ({ user }) => {
	const { isAuth, role, token } = user;

	return (
		<BrowserRouter>
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
		</BrowserRouter>
	);
};

export default Router;
