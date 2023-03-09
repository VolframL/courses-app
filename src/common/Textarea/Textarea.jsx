import styles from './Textarea.module.scss';

const Textarea = ({
	name,
	labelText = '',
	placeholderText = '',
	onChange = () => {},
	value,
	cols = 1,
	rows = 4,
	required = true,
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
				required={required}
			/>
			<div className={styles.error}>{error}</div>
		</div>
	);
};

export default Textarea;
