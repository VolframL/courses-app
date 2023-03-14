import { Routes, Route } from 'react-router-dom';
import React, { FC, useState, useEffect } from 'react';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import CreateCourse from 'components/CreateCourse/CreateCourse';
import Registration from 'components/Registration/Registration';
import Login from 'components/Login/Login';

import { mockedAuthorsList, mockedCoursesList } from './constants';

import styles from './App.module.scss';

const App: FC = () => {
	const [userName, setUserName] = useState<string>('');

	const getToken = () => {
		const token = window.localStorage.getItem('token-courses');
		if (token) {
			const userName: string = JSON.parse(token).user.name;
			setUserName(userName);
		}
	};

	useEffect(() => {
		getToken();
	}, []);

	return (
		<div className={styles.app}>
			<Header userName={userName} setUserName={setUserName} />
			<div className={styles.wrapper}>
				<Routes>
					{userName ? (
						<>
							<Route
								path='/'
								element={
									<Courses
										// mockedAuthorsList={mockedAuthorsList}
										mockedCoursesList={mockedCoursesList}
									/>
								}
							/>
							<Route
								path='/courses'
								element={
									<Courses
										// mockedAuthorsList={mockedAuthorsList}
										mockedCoursesList={mockedCoursesList}
									/>
								}
							/>
							<Route
								path='/courses/:courseId'
								element={
									<CourseInfo
										mockedAuthorsList={mockedAuthorsList}
										mockedCoursesList={mockedCoursesList}
									/>
								}
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
							<Route path='/registration' element={<Registration />} />
							<Route
								path='/Login'
								element={
									<Login userName={userName} setUserName={setUserName} />
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
			</div>
		</div>
	);
};

export default App;
