import React, { FC, useState, ChangeEvent, Dispatch } from 'react';

import Input from 'common/Input';

import { pipeDuration } from 'helpers';

import styles from '../CourseForm.module.scss';

const Duration: FC<{
	duration: string;
	setDuration: Dispatch<string>;
	durationText: string;
	setDurationText: Dispatch<string>;
}> = ({ duration, setDuration, durationText, setDurationText }) => {
	const [errorDuration, setErrorDuration] = useState('');

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

	return (
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
	);
};

export default Duration;
