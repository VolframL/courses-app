import React, { ChangeEvent, FC } from 'react';

import styles from './Input.module.scss';

type InputType = {
	name?: string;
	labelText?: string;
	placeholderText?: string;
	onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
	value?: string | number;
	type?: 'text' | 'email' | 'password';
	error?: string;
};

const Input: FC<InputType> = ({
	name,
	labelText,
	placeholderText,
	onChange,
	value,
	type,
	error,
}) => {
	return (
		<div className={styles.wrapper}>
			<label htmlFor={name}>{labelText}</label>
			<input
				className={styles.input}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholderText}
				type={type}
			/>
			<div className={'error'}>{error}</div>
		</div>
	);
};

export default Input;
