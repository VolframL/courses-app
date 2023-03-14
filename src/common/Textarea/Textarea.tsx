import React, { ChangeEvent, FC } from 'react';
import styles from './Textarea.module.scss';

type TextareaType = {
	name?: string;
	labelText?: string;
	placeholderText?: string;
	onChange?: (value: ChangeEvent<HTMLTextAreaElement>) => void;
	value?: string | number;
	type?: 'text' | 'email' | 'password';
	error?: string;
	cols?: number;
	rows?: number;
};

const Textarea: FC<TextareaType> = ({
	name,
	labelText = '',
	placeholderText = '',
	onChange = () => {},
	value,
	cols = 1,
	rows = 4,
	error = '',
}) => {
	return (
		<div className={styles.wrapper}>
			<label htmlFor={name}>{labelText}</label>
			<textarea
				className={styles.textarea}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholderText}
				cols={cols}
				rows={rows}
			/>
			<div className={styles.error}>{error}</div>
		</div>
	);
};

export default Textarea;
