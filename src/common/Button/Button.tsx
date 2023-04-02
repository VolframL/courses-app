import React, { FC, MouseEvent, ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
	onClick?: (e: MouseEvent<HTMLElement>) => void;
	type?: 'submit' | 'reset' | 'button';
	disabled?: boolean;
	className?: string;
	children?: ReactNode;
};

const Button: FC<ButtonProps> = ({
	onClick,
	type,
	disabled = false,
	className = '',
	children,
}) => {
	console.log('button ' + children?.toLocaleString() + 'render');
	return (
		<button
			disabled={disabled}
			className={styles.button + ' ' + className}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
export default Button;
