import { useNavigate, useParams } from 'react-router-dom';
import React, { FC, useState, useEffect } from 'react';

import Button from 'common/Button';
import Input from 'common/Input';

import Title from './components/Title';
import Description from './components/Description';
import Duration from './components/Duration';

import { validateMinLength, onInput } from 'helpers';
import { CREATE_AUTHOR_BUTTON_TEXT } from '../../constants';
import { AuthorType, CourseToPost } from 'types';
import { getAuthors } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'store/index';
import url from 'urls';

import { addAuthor } from 'store/authors/thunk';
import { addCourse } from 'store/courses/thunk';

import styles from './CourseForm.module.scss';

const CreateCourse: FC<{ token: string }> = ({ token }) => {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [courseAuthorList, setCourseAuthorList] = useState<AuthorType[]>([]);
	const [requiredAuthorList, setRequiredAuthorList] = useState(false);
	const [title, setTitle] = useState('');
	const [newAuthorName, setNewAuthorName] = useState('');
	const [errorAuthorName, setErrorAuthorName] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');

	const authorList = useAppSelector(getAuthors);
	const [renderedAuthorList, setRenderedAuthorList] =
		useState<AuthorType[]>(authorList);

	useEffect(() => {
		setRenderedAuthorList(authorList);
	}, [authorList]);

	useEffect(() => {
		if (courseId) {
			console.log('courseId');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onCreateAuthor = (newAuthorName: string) => {
		validateMinLength(newAuthorName, 2, 'Author name', setErrorAuthorName);

		dispatch(addAuthor({ token, author: newAuthorName }))
			.then(() => setNewAuthorName(''))
			.catch((e) => {
				setErrorAuthorName(e.message);
			});
	};

	const onAddAuthor = (obj: AuthorType) => {
		setRequiredAuthorList(false);
		setCourseAuthorList([...courseAuthorList, obj]);
		setRenderedAuthorList(
			renderedAuthorList.filter((item: AuthorType) => item.id !== obj.id)
		);
	};

	const onDeleteAuthor = (obj: AuthorType) => {
		setRenderedAuthorList([...renderedAuthorList, obj]);
		setCourseAuthorList(courseAuthorList.filter((item) => item.id !== obj.id));
	};

	const onSubmit = () => {
		if (!courseAuthorList.length) {
			setRequiredAuthorList(true);
		}
		// if (!duration) {
		// 	setErrorDuration('Duration cannot be empty');
		// }
		// if (+duration <= 0) {
		// 	setErrorDuration('Duration must be more than 0 minute');
		// }

		if (courseAuthorList.length && title && description && +duration > 0) {
			const newCourse: CourseToPost = {
				// id: uuid(),
				title,
				description,
				// creationDate: new Date().toLocaleDateString('en-US'),
				duration: +duration,
				authors: courseAuthorList.map((obj) => obj.id),
			};

			dispatch(addCourse({ token, course: newCourse }));
			navigate(url.courses);
		} else {
			alert('Please, fill in all fields');
		}
	};

	return (
		<div className={styles.wrapper}>
			<Title onSubmit={onSubmit} title={title} setTitle={setTitle} />
			<Description description={description} setDescription={setDescription} />
			<div className={styles.main}>
				<div className={styles.add_new_author}>
					<b>Add author</b>
					<Input
						value={newAuthorName}
						onChange={(e) =>
							onInput(e, 'Author name', 2, setNewAuthorName, setErrorAuthorName)
						}
						labelText='Author name'
						placeholderText='Enter author name'
						error={errorAuthorName}
					/>
					<Button
						disabled={Boolean(errorAuthorName)}
						onClick={() => onCreateAuthor(newAuthorName)}
					>
						{CREATE_AUTHOR_BUTTON_TEXT}
					</Button>
				</div>
				<div className={styles.author_list}>
					<b>Authors</b>
					<ul>
						{renderedAuthorList.length
							? renderedAuthorList.map((obj: AuthorType) => {
									return (
										<li key={obj.id}>
											<div>{obj.name}</div>
											<Button onClick={() => onAddAuthor(obj)}>
												Add author
											</Button>
										</li>
									);
							  })
							: 'Authors list is empty'}
					</ul>
				</div>
				<Duration duration={duration} setDuration={setDuration} />
				<div className={styles.author_list}>
					<b>Course authors</b>
					<div className={'error'}>
						{requiredAuthorList && 'Author list cannot be empty'}
					</div>
					<ul>
						{courseAuthorList.length
							? courseAuthorList.map((obj) => {
									return (
										<li key={obj.id}>
											<div>{obj.name}</div>
											<Button onClick={() => onDeleteAuthor(obj)}>
												Delete author
											</Button>
										</li>
									);
							  })
							: 'Authors list is empty'}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CreateCourse;
