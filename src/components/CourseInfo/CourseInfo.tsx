import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { dateGenerator, pipeDuration } from 'helpers';
import url from 'urls';

import styles from './CourseInfo.module.scss';
import { CourseType } from 'types';

type CourseInfoProps = {
	mockedCoursesList: CourseType[];
};

const CourseInfo: FC<CourseInfoProps> = ({ mockedCoursesList }) => {
	const { courseId } = useParams();

	const [course, setCourse] = useState<CourseType>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setCourse(mockedCoursesList.filter((item) => item.id === courseId)[0]);
		setLoading(false);
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

	if (!loading && course) {
		const { title, duration, description, id, creationDate } = course;
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
									{/* {getAuthorsListArr(authors, ).map((item) => (
										<li key={item}>{item}</li>
									))} */}
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
