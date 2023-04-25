import { useNavigate, useParams } from 'react-router-dom';
import React, { FC, useState, useEffect } from 'react';

import Title from './components/Title';
import Description from './components/Description';
import Duration from './components/Duration';
import AuthorList from './components/AuthorList';

import { addCourse, updCourse } from 'store/courses/thunk';
import { getAuthors } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'store/index';
import useCoursesService from 'services';
import url from 'urls';

import { AuthorType, CourseToPost } from 'types';

import styles from './CourseForm.module.scss';

const CreateCourse: FC = () => {
	const { courseId } = useParams();
	const { fetchCourseById } = useCoursesService();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [courseAuthorList, setCourseAuthorList] = useState<AuthorType[]>([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');

	const authorList = useAppSelector(getAuthors);
	const [renderedAuthorList, setRenderedAuthorList] =
		useState<AuthorType[]>(authorList);

	useEffect(() => {
		setRenderedAuthorList(authorList);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (courseId) {
			fetchCourseById(courseId)
				.then((res) => {
					const { title, authors, duration, description } = res.data.result;
					setTitle(title);
					// let authorsFromBack: AuthorType[] = [];
					// console.log(authors);
					// authors.forEach((id: string) => {
					// 	fetchAuthorById(id)
					// 		.then((res) => {
					// 			const { name, id } = res.data.result;
					// 			// authorsFromBack.push({ name, id });
					// 			setCourseAuthorList([...courseAuthorList, { name, id }]);
					// 		})
					// 		.catch((e) => console.log(e))
					// 		.finally(() => {
					// 			// console.log(authorsFromBack);
					// 		});
					// });
					// setCourseAuthorList(authorsFromBack);
					setCourseAuthorList(authors);
					setDescription(description);
					setDuration(duration);
				})
				.catch((e) => console.log(e));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	return (
		<div className={styles.wrapper}>
			<Title
				onSubmit={onSubmit}
				title={title}
				setTitle={setTitle}
				courseId={courseId}
			/>
			<Description description={description} setDescription={setDescription} />
			<div className={styles.main}>
				{/* <CreateAuthor
					setRenderedAuthorList={setRenderedAuthorList}
					renderedAuthorList={renderedAuthorList}
				/> */}
				<Duration duration={duration} setDuration={setDuration} />
				<AuthorList
					renderedAuthorList={renderedAuthorList}
					setCourseAuthorList={setCourseAuthorList}
					courseAuthorList={courseAuthorList}
					setRenderedAuthorList={setRenderedAuthorList}
				/>
			</div>
		</div>
	);
};

export default CreateCourse;
