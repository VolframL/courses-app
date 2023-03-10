import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { dateGenerator, pipeDuration, findAuthor } from 'helpers';
import axios from 'utils/axios';

import styles from './CourseInfo.module.scss';

const CourseInfo = ({ mockedCoursesList, mockedAuthorsList }) => {
	const { courseId } = useParams();

	const [course, setCourse] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setCourse(mockedCoursesList.filter((item) => item.id === courseId));
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// useEffect(() => {
	// 	try {
	// 		fetchCourse();
	// 	} catch (error) {
	// 		console.log(error);
	// 		alert('Failed to get course');
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// const fetchCourse = async () => {
	// 	const { data } = await axios.get(`/courses/${courseId}`);
	// 	setCourse(data.result);
	// 	setLoading(false);
	// };

	if (loading) {
		return <div>Loading</div>;
	}

	const { title, duration, description, authors, id, creationDate } = course[0];

	return (
		<div className={styles.root}>
			<Link to='/courses'>{'<'} Back to courses</Link>
			<div className={styles.wrapper}>
				<h2>{title}</h2>
				<div className={styles.description}>
					<p>{description}</p>
					<div className={styles.course_info}>
						<div>
							<b>ID: </b>
							{id}
						</div>
						<div>
							<b>Duration: </b>
							{pipeDuration(duration)}
						</div>
						<div>
							<b>Created: </b>
							{dateGenerator(creationDate)}
						</div>
						<div>
							<b className={styles.authors}>Authors:</b>
							<ul>
								{findAuthor(authors).map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseInfo;
