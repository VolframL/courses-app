import React, { FC, useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';

import styles from './Courses.module.scss';
import { AuthorType, CourseType } from 'types';
import useCoursesService from 'services';
import { setCourses } from 'store/courses/actionCreators';
import { getAuthors, getCourses } from 'store/selectors';
import { setAuthors } from 'store/authors/actionCreators';
import { useAppDispatch, useAppSelector } from 'store/index';

import { filterCourse } from 'helpers';

const Courses: FC = memo(() => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { fetchAllCourses, fetchAllAuthors } = useCoursesService();
	const [searchText, setSearchText] = useState('');
	const coursesList: CourseType[] = useAppSelector(getCourses);
	const authorList: AuthorType[] = useAppSelector(getAuthors);

	const [filteresCourses, setFilteresCourses] = useState(coursesList);

	useEffect(() => {
		fetchAllCourses().then(({ result }) => dispatch(setCourses(result)));
		fetchAllAuthors().then(({ result }) => dispatch(setAuthors(result)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setFilteresCourses(coursesList);
	}, [coursesList]);

	const onSearch = (): boolean | void => {
		setFilteresCourses(filterCourse(coursesList, searchText));
	};

	useEffect(() => {
		if (searchText === '') {
			setFilteresCourses(coursesList);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchText]);

	if (!authorList.length || !coursesList.length) {
		return <div className={styles.wrapper}>Loading</div>;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.top}>
				<SearchBar
					onSearch={onSearch}
					setSearchText={setSearchText}
					searchText={searchText}
				/>
				<Button onClick={() => navigate('/courses/add')}>Add new course</Button>
			</div>
			{filteresCourses.map((course) => (
				<CourseCard key={course.id} course={course} authorList={authorList} />
			))}
		</div>
	);
});
export default Courses;
