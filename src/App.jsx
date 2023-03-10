import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import CreateCourse from 'components/CreateCourse/CreateCourse';
import Registration from 'components/Registration/Registration';
import Login from 'components/Login/Login';

import { mockedAuthorsList, mockedCoursesList } from 'constants';

import styles from './App.module.scss';

function App() {
	return (
		<BrowserRouter>
			<div className={styles.app}>
				<Header />
				<div className={styles.wrapper}>
					<Routes>
						<Route
							path='/courses'
							element={
								<Courses
									mockedAuthorsList={mockedAuthorsList}
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
						<Route path='/Login' element={<Login />} />
						{window.localStorage.getItem('token') ? (
							<Route
								path='/'
								element={
									<Courses
										mockedAuthorsList={mockedAuthorsList}
										mockedCoursesList={mockedCoursesList}
									/>
								}
							/>
						) : (
							<Route path='/' element={<Login />} />
						)}
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
