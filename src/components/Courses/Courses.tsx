import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';

import styles from './Courses.module.scss';
import { CourseType } from 'types';

type CoursesProps = {
	mockedCoursesList: CourseType[];
};

const Courses: FC<CoursesProps> = ({ mockedCoursesList }) => {
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState('');
	const [coursesList, setCoursesList] = useState(mockedCoursesList);

	useEffect(() => {
		navigate('/courses');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSearch = (): boolean | void => {
		setCoursesList(
			coursesList.filter((course) => {
				const searchByName = course.title
					.toLowerCase()
					.includes(searchText.toLowerCase());
				if (searchByName) {
					return searchByName;
				}
				const searchById = course.id
					.toLowerCase()
					.includes(searchText.toLowerCase());
				if (searchById) {
					return searchById;
				}
				return false;
			})
		);
	};

	useEffect(() => {
		if (searchText === '') {
			setCoursesList(mockedCoursesList);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchText]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.top}>
				<SearchBar
					onSearch={onSearch}
					setSearchText={setSearchText}
					searchText={searchText}
				/>
				<Button
					onClick={() => navigate('/courses/add')}
					buttonText='Add new course'
				/>
			</div>
			{coursesList.map((course) => (
				<CourseCard key={course.id} course={course} />
			))}
		</div>
	);
};

export default Courses;
