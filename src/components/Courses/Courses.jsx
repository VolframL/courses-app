import { useState, useEffect } from 'react';

import Button from 'common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';

import styles from './Courses.module.scss';

const Courses = ({ onSetPage, mockedCoursesList }) => {
	const [searchText, setSearchText] = useState('');
	const [coursesList, setCoursesList] = useState(mockedCoursesList);

	const onSearch = () => {
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
		<main className={styles.courses}>
			<div className={styles.top}>
				<SearchBar
					onSearch={onSearch}
					setSearchText={setSearchText}
					searchText={searchText}
				/>
				<Button
					onClick={() => onSetPage('addCouse')}
					buttonText='Add new course'
				/>
			</div>
			{coursesList.map((course) => (
				<CourseCard key={course.id} course={course} />
			))}
		</main>
	);
};

export default Courses;
