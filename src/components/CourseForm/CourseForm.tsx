import { useNavigate, useParams } from 'react-router-dom';
import React, { FC, useState, useEffect } from 'react';

import Title from './components/Title';
import Description from './components/Description';
import Duration from './components/Duration';
import AuthorList from './components/AuthorList/AuthorList';

import { addCourse, updCourse } from 'store/courses/thunk';
import { useAppDispatch, useAppSelector } from 'store/index';
import useCoursesService from 'services';
import url from 'urls';

import { AuthorType, CourseToPost } from 'types';

import styles from './CourseForm.module.scss';
import { getAuthorsListArr } from 'helpers/getAuthorListArr';
import { getAuthors } from 'store/selectors';
import { setAuthors } from 'store/authors/thunk';

const CourseForm: FC = () => {
	const { courseId } = useParams();
	const { fetchCourseById } = useCoursesService();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const authorList = useAppSelector(getAuthors);

	const [courseAuthorList, setCourseAuthorList] = useState<AuthorType[]>([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');

	useEffect(() => {
		dispatch(setAuthors());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (courseId && authorList.length) {
			fetchCourseById(courseId)
				.then((res) => {
					const { title, authors, duration, description } = res.data.result;
					setTitle(title);
					setCourseAuthorList(getAuthorsListArr(authors, authorList));
					setDescription(description);
					setDuration(duration);
				})
				.catch((e) => console.log(e));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authorList]);

	const onSubmit = () => {
		if (courseAuthorList.length && title && description && +duration > 0) {
			const newCourse: CourseToPost = {
				title,
				description,
				duration: +duration,
				authors: courseAuthorList.map((obj) => obj.id),
			};

			courseId
				? dispatch(updCourse({ id: courseId, course: newCourse }))
				: dispatch(addCourse(newCourse));
			navigate(url.courses);
		} else {
			alert('Please, fill in all fields');
		}
	};

	if (authorList.length) {
		return (
			<div className={styles.wrapper}>
				<Title
					onSubmit={onSubmit}
					title={title}
					setTitle={setTitle}
					courseId={courseId}
				/>
				<Description
					description={description}
					setDescription={setDescription}
				/>
				<div className={styles.main}>
					<Duration duration={duration} setDuration={setDuration} />
					<AuthorList
						courseAuthorList={courseAuthorList}
						setCourseAuthorList={setCourseAuthorList}
						authorList={authorList}
					/>
				</div>
			</div>
		);
	} else {
		return <div>Loading...</div>;
	}
};

export default CourseForm;
