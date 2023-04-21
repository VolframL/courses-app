import React, { FC, useState } from 'react';

import Input from 'common/Input';
import Button from 'common/Button';

import { onInput } from 'helpers';

import { TitleProps } from 'types';

import styles from '../CourseForm.module.scss';

const Title: FC<TitleProps> = ({ onSubmit, title, setTitle, courseId }) => {
	const [errorTitle, setErrorTitle] = useState('');

	const onPressCreateCourse = () => {
		if (title === '') {
			setErrorTitle('Title cannot be empty');
		}
		onSubmit();
	};

	return (
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
			<Button onClick={onPressCreateCourse}>
				{courseId ? 'Save course' : 'Create course'}
			</Button>
		</div>
	);
};

export default Title;
