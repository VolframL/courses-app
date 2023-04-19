import React, { useState } from 'react';

import Textarea from 'common/Textarea';

import { onInput } from 'helpers';

import styles from '../CourseForm.module.scss';

const Description = ({ description, setDescription }) => {
	const [errorDescription, setErrorDescription] = useState('');

	// useEffect(() => {
	// 	if (description === '') {
	// 		setErrorDescription('Description cannot be empty');
	// 	}
	// }, [description]);

	return (
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
	);
};

export default Description;
