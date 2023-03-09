import styles from './Input.module.scss';

const Input = ({
	name,
	labelText = '',
	placeholderText = '',
	onChange = () => {},
	value,
	type = 'text',
	error = '',
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
			<div className={styles.error}>{error}</div>
		</div>
	);
};

export default Input;
