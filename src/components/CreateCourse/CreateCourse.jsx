import Button from 'common/Button/Button';
import Input from 'common/Input/Input';
import Textarea from 'common/Textarea/Textarea';

import { mockedAuthorsList } from 'constants';

import { useState } from 'react';

import { v4 as uuid } from 'uuid';

import styles from './CreateCourse.module.scss';

const CreateCourse = () => {
	const [newAuthorName, setNewAuthorName] = useState('');

	const onAddNewAuthor = (newAuthorName) => {
		const newAuthor = {
			name: newAuthorName,
			id: uuid(),
		};

		setNewAuthorName('');

		mockedAuthorsList[5] = newAuthor;
	};

	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<div className={styles.input}>
					<Input labelText='Title' placeholderText='Enter title' />
				</div>
				<Button buttonText='Create course' />
			</div>
			<div className={styles.description}>
				<Textarea
					name='description'
					placeholderText='Enter description'
					labelText='Description'
				/>
			</div>
			<div className={styles.main}>
				<div className={styles.add_new_author}>
					<b>Add author</b>
					<Input
						value={newAuthorName}
						onChange={setNewAuthorName}
						labelText='Author name'
						placeholderText='Enter author name'
					/>
					<Button
						onClick={() => onAddNewAuthor(newAuthorName)}
						buttonText='Create author'
					/>
				</div>
				<div className={styles.author_list}>
					<b>Authors</b>
					<ul>
						{mockedAuthorsList.map((obj) => {
							return (
								<li key={obj.id}>
									<div>{obj.name}</div>
									<Button buttonText='Add author' />
								</li>
							);
						})}
					</ul>
				</div>
				<div className={styles.duration}>
					<b>Duration</b>
					<Input
						placeholderText='Enter duration in minutes'
						labelText='Duration'
					/>
					<div className={styles.time}>
						Duration: <b>00:00</b> hours
					</div>
				</div>
				<div className={styles.author_list}>
					<b>Course authors</b>
					Authors list is empty
					<ul>
						<li>
							<div>Nicolas Kim</div>
							<Button buttonText='Delete author' />
						</li>
						<li>
							<div>Vasilii Dobkin</div>
							<Button buttonText='Delete author' />
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CreateCourse;
