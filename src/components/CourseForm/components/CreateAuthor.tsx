import React, { FC, useState } from 'react';

import Input from 'common/Input';
import Button from 'common/Button';

import { addAuthor } from 'store/authors/thunk';
import { useAppDispatch } from 'store/index';
import { validateMinLength, onInput } from 'helpers';

import { CreateAuthorProps } from 'types';

import styles from '../CourseForm.module.scss';

const CreateAuthor: FC<CreateAuthorProps> = ({
	setRenderedAuthorList,
	renderedAuthorList,
}) => {
	const dispatch = useAppDispatch();

	const [newAuthorName, setNewAuthorName] = useState('');
	const [errorAuthorName, setErrorAuthorName] = useState('');

	const onCreateAuthor = (newAuthorName: string) => {
		validateMinLength(newAuthorName, 2, 'Author name', setErrorAuthorName);

		dispatch(addAuthor(newAuthorName))
			.then((res) => {
				// @ts-ignore
				const newAuthor = res.payload.data.result;
				setRenderedAuthorList([...renderedAuthorList, newAuthor]);
			})
			.catch((e) => {
				if (e.message === `["'name' was missed."]`) {
					setErrorAuthorName('Author name missed');
				}
			});
	};

	return (
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
				onClick={() => {
					onCreateAuthor(newAuthorName);
					setNewAuthorName('');
				}}
			>
				Create author
			</Button>
		</div>
	);
};

export default CreateAuthor;
