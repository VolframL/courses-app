import styles from './Input.module.scss';

const Input = ({
	name,
	labelText = '',
	placeholderText = '',
	onChange = () => {},
	value,
	type = 'text',
	required = true,
}) => {
	return (
		<div className={styles.wrapper}>
			<label htmlFor={name}>{labelText}</label>
			<input
				className={styles.input}
				name={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholderText}
				type={type}
				required={required}
			/>
		</div>
	);
};

export default Input;
