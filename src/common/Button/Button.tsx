import React, { FC, MouseEvent } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
	buttonText?: string;
	onClick?: (e: MouseEvent<HTMLElement>) => void;
	type?: 'submit' | 'reset' | 'button';
	disabled?: boolean;
	className?: string;
};

const Button: FC<ButtonProps> = ({
	buttonText,
	onClick,
	type,
	disabled = false,
	className,
}) => {
	return (
		<button
			disabled={disabled}
			className={styles.button + ' ' + className}
			type={type}
			onClick={onClick}
		>
			{buttonText}
		</button>
	);
};

export default Button;
