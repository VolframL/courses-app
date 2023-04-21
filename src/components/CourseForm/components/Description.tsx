import React, { FC, useState } from 'react';

import Textarea from 'common/Textarea';

import { onInput } from 'helpers';

import { DescriptionProps } from 'types';

import styles from '../CourseForm.module.scss';

const Description: FC<DescriptionProps> = ({ description, setDescription }) => {
	const [errorDescription, setErrorDescription] = useState('');

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
