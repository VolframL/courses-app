import React, { FC, useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'common/Button';
import SearchBar from './components/SearchBar';
import CourseCard from './components/CourseCard';

import styles from './Courses.module.scss';
import { AuthorType, CourseType, CoursesProps } from 'types';
import { getAuthors, getCourses } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'store/index';

import url from 'urls';
import { filterCourse } from 'helpers';
import { setCourses } from 'store/courses/reducer';
import { setAuthors } from 'store/authors/thunk';
import useCoursesService from 'services';

const Courses: FC<CoursesProps> = memo(({ role, token }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState('');
	const { fetchAllCourses } = useCoursesService();

	const coursesList: CourseType[] = useAppSelector(getCourses);
	const authorList: AuthorType[] = useAppSelector(getAuthors);

	const [filteresCourses, setFilteresCourses] = useState(coursesList);

	useEffect(() => {
		fetchAllCourses().then(({ result }) => dispatch(setCourses(result)));
		dispatch(setAuthors());
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
				{role === 'admin' && (
					<Button onClick={() => navigate(url.courseAdd)}>
						Add new course
					</Button>
				)}
			</div>
			{filteresCourses.map((course) => (
				<CourseCard
					role={role}
					token={token}
					key={course.id}
					course={course}
					authorList={authorList}
				/>
			))}
		</div>
	);
});
export default Courses;
