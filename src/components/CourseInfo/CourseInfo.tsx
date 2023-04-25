import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { dateGenerator, getAuthorsListArr, pipeDuration } from 'helpers';
import url from 'urls';

import styles from './CourseInfo.module.scss';
import { AuthorType, CourseType } from 'types';
import useCoursesService from 'services';
import { useAppDispatch, useAppSelector } from 'store';
import { getAuthors } from 'store/selectors';
import { setAuthors } from 'store/authors/thunk';

const CourseInfo: FC = () => {
	const { courseId } = useParams();
	const dispatch = useAppDispatch();

	const [course, setCourse] = useState<CourseType>();
	const [loading, setLoading] = useState(true);

	const authorList: AuthorType[] = useAppSelector(getAuthors);

	const { fetchCourseById } = useCoursesService();

	useEffect(() => {
		if (courseId) {
			dispatch(setAuthors());
			fetchCourseById(courseId)
				.then(({ data }) => setCourse(data.result))
				.catch((e) => console.log(e))
				.finally(() => setLoading(false));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!loading && !course) {
		return (
			<div>
				<div>Course is not found</div>
				<Link to={url.courses}>{'<'} Back to courses</Link>
			</div>
		);
	}

	if (!loading && course && authorList.length) {
		const { title, duration, description, id, creationDate, authors } = course;
		return (
			<div className={styles.wrapper}>
				<Link to={url.courses}>{'<'} Back to courses</Link>
				<div className={styles.course}>
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
									{getAuthorsListArr(authors, authorList).map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <div>Loading</div>;
	}
};

export default CourseInfo;
