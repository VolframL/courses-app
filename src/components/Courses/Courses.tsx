import React, { FC, useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';

import styles from './Courses.module.scss';
import {
	AuthorsSliceState,
	CourseType,
	CoursesSliceState,
	Status,
} from 'types';
import { getAuthors, getCourses, getUser } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'store/index';

import { filterCourse } from 'helpers';
// import { setAuthors } from 'store/authors/reducer';
// import useCoursesService from 'services';
import { fetchCourses } from 'store/courses/thunk';
import { fetchAuthors } from 'store/authors/thunk';

const Courses: FC = memo(() => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState('');
	// const { fetchAllAuthors } = useCoursesService();
	const { role } = useAppSelector(getUser);

	const { items: coursesList, status: coursesStatus }: CoursesSliceState =
		useAppSelector(getCourses);
	const { items: authorList, status: authorsStatus }: AuthorsSliceState =
		useAppSelector(getAuthors);

	const status = {
		error: coursesStatus === Status.ERROR && authorsStatus === Status.ERROR,
		loading:
			coursesStatus === Status.LOADING && authorsStatus === Status.LOADING,
		succes:
			coursesStatus === Status.SUCCESS && authorsStatus === Status.SUCCESS,
	};

	// const [filteresCourses, setFilteresCourses] = useState(coursesList);

	useEffect(() => {
		dispatch(fetchCourses());
		dispatch(fetchAuthors());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// useEffect(() => {
	// 	setFilteresCourses(coursesList);
	// }, [coursesList]);

	const onSearch = (): boolean | void => {
		// setFilteresCourses(filterCourse(coursesList, searchText));
	};

	// useEffect(() => {
	// 	if (searchText === '') {
	// 		setFilteresCourses(coursesList);
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [searchText]);

	const courses = filterCourse(coursesList, searchText).map((course) => (
		<CourseCard key={course.id} course={course} authorList={authorList} />
	));

	return (
		<div className={styles.wrapper}>
			<div className={styles.top}>
				<SearchBar
					onSearch={onSearch}
					setSearchText={setSearchText}
					searchText={searchText}
				/>
				{role === 'admin' && (
					<Button onClick={() => navigate('/courses/add')}>
						Add new course
					</Button>
				)}
			</div>
			{status.error ? (
				<div>Error component</div>
			) : status.loading ? (
				<div>Loading / Skeleton</div>
			) : courses.length > 0 ? (
				// filteresCourses.map((course) => (
				// 	<CourseCard key={course.id} course={course} authorList={authorList} />
				// ))
				courses
			) : (
				<div>Courses not found...</div>
			)}
		</div>
	);
});
export default Courses;
