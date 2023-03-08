import styles from './Button.module.scss';

const Button = ({ buttonText, onClick = () => {}, type = 'button' }) => {
	return (
		<button className={styles.button} type={type} onClick={() => onClick()}>
			{buttonText}
		</button>
	);
};

export default Button;
