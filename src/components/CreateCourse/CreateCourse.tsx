import { useNavigate } from 'react-router-dom';
import React, { FC, ChangeEvent, SetStateAction, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Button from 'common/Button/Button';
import Input from 'common/Input/Input';
import Textarea from 'common/Textarea/Textarea';

import { pipeDuration, validateMinLength } from 'helpers';
import { CREATE_AUTHOR_BUTTON_TEXT } from '../../constants';
import { CourseType, AuthorType } from 'types';

import styles from './CreateCourse.module.scss';

type CreateCourseProps = {
	mockedAuthorsList: AuthorType[];
	mockedCoursesList: CourseType[];
};

const CreateCourse: FC<CreateCourseProps> = ({
	mockedAuthorsList,
	mockedCoursesList,
}) => {
	const navigate = useNavigate();

	const [courseAuthorList, setCourseAuthorList] = useState<AuthorType[]>([]);
	const [requiredAuthorList, setRequiredAuthorList] = useState(false);
	const [authorList, setAuthorList] = useState(mockedAuthorsList);
	const [title, setTitle] = useState('');
	const [errorTitle, setErrorTitle] = useState('');
	const [newAuthorName, setNewAuthorName] = useState('');
	const [errorAuthorName, setErrorAuthorName] = useState('');
	const [description, setDescription] = useState('');
	const [errorDescription, setErrorDescription] = useState('');
	const [duration, setDuration] = useState('');
	const [durationText, setDurationText] = useState('');
	const [errorDuration, setErrorDuration] = useState('');

	const onInput = (
		e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
		title: string,
		minLength: number,
		setFunc: {
			(value: SetStateAction<string>): void;
		},
		setErrorFunc: {
			(errorText: SetStateAction<string>): void;
		}
	) => {
		const { value } = e.target;
		setFunc(value);
		validateMinLength(value, minLength, title, setErrorFunc);
	};

	const onInputDuration = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (/\D/.test(value)) {
			setErrorDuration('It should only be numbers.');
		} else if (value.charAt(0) === '0') {
			setErrorDuration('The first digit cannot be 0.');
			setDuration('');
		} else {
			setErrorDuration('');
			setDuration(value);
			setDurationText(pipeDuration(+value));
		}
	};

	const onCreateAuthor = (newAuthorName: string) => {
		validateMinLength(newAuthorName, 2, 'Author name', setErrorAuthorName);

		if (newAuthorName) {
			const newAuthor = {
				name: newAuthorName,
				id: uuid(),
			};

			setNewAuthorName('');
			setAuthorList([...authorList, newAuthor]);
			mockedAuthorsList.push(newAuthor);
		}
	};

	const onAddAuthor = (obj: AuthorType) => {
		setRequiredAuthorList(false);
		setCourseAuthorList([...courseAuthorList, obj]);
		setAuthorList(authorList.filter((item) => item.id !== obj.id));
	};

	const onDeleteAuthor = (obj: AuthorType) => {
		setAuthorList([...authorList, obj]);
		setCourseAuthorList(courseAuthorList.filter((item) => item.id !== obj.id));
	};

	const onSubmit = () => {
		if (!courseAuthorList.length) {
			setRequiredAuthorList(true);
		}
		if (!title) {
			setErrorTitle('Title cannot be empty');
		}
		if (!description) {
			setErrorDescription('Description cannot be empty');
		}
		if (!duration) {
			setErrorDuration('Duration cannot be empty');
		}
		if (+duration <= 0) {
			setErrorDuration('Duration must be more than 0 minute');
		}

		if (courseAuthorList.length && title && description && +duration > 0) {
			const newCourse = {
				id: uuid(),
				title,
				description,
				creationDate: new Date().toLocaleDateString('en-US'),
				duration: +duration,
				authors: courseAuthorList.map((obj) => obj.id),
			};

			mockedCoursesList.push(newCourse);
			navigate('/courses');
		} else {
			alert('Please, fill in all fields');
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.input}>
					<Input
						labelText='Title'
						placeholderText='Enter title'
						onChange={(e) => onInput(e, 'Title', 2, setTitle, setErrorTitle)}
						value={title}
						error={errorTitle}
						name='title'
					/>
				</div>
				<Button onClick={onSubmit} buttonText='Create course' />
			</div>
			<div className={styles.description}>
				<Textarea
					value={description}
					name='description'
					placeholderText='Enter description'
					labelText='Description'
					error={errorDescription}
					onChange={(e) =>
						onInput(e, 'Description', 2, setDescription, setErrorDescription)
					}
				/>
			</div>
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
						buttonText={CREATE_AUTHOR_BUTTON_TEXT}
					/>
				</div>
				<div className={styles.author_list}>
					<b>Authors</b>
					<ul>
						{authorList.length
							? authorList.map((obj) => {
									return (
										<li key={obj.id}>
											<div>{obj.name}</div>
											<Button
												buttonText='Add author'
												onClick={() => onAddAuthor(obj)}
											/>
										</li>
									);
							  })
							: 'Authors list is empty'}
					</ul>
				</div>
				<div className={styles.duration}>
					<b>Duration</b>
					<Input
						placeholderText='Enter duration in minutes'
						labelText='Duration'
						onChange={onInputDuration}
						value={duration}
						error={errorDuration}
						name='duration'
					/>
					<div className={styles.time}>
						Duration: <b>{durationText || '00:00'}</b> hours
					</div>
				</div>
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
											<Button
												buttonText='Delete author'
												onClick={() => onDeleteAuthor(obj)}
											/>
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
