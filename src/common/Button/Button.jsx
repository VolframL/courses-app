import styles from './Button.module.scss';

const Button = ({
	buttonText,
	onClick = () => {},
	type = 'button',
	disabled = false,
}) => {
	return (
		<button
			disabled={disabled}
			className={styles.button}
			type={type}
			onClick={() => onClick()}
		>
			{buttonText}
		</button>
	);
};

export default Button;
