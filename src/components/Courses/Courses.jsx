import Button from 'common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import CourceCard from './components/CourseCard/CourseCard';
import styles from './Courses.module.scss';
import { mockedCoursesList } from 'constants';
import { useState, useEffect } from 'react';

const Courses = ({ onSetPageAddCourse }) => {
	const [searchText, setSearchText] = useState('');
	const [coursesList, setCoursesList] = useState(mockedCoursesList);

	const onSearch = () => {
		setCoursesList(
			coursesList.filter((course) =>
				course.title.toLowerCase().includes(searchText.toLowerCase())
			)
		);
	};

	useEffect(() => {
		if (searchText === '') {
			setCoursesList(mockedCoursesList);
		}
	}, [searchText]);

	return (
		<main className={styles.courses}>
			<div className={styles.top}>
				<SearchBar
					onSearch={onSearch}
					setSearchText={setSearchText}
					searchText={searchText}
				/>
				<Button onClick={onSetPageAddCourse} buttonText='Add new course' />
			</div>
			{coursesList.map((course) => (
				<CourceCard key={course.id} course={course} />
			))}
		</main>
	);
};

export default Courses;
