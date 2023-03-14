import { SetStateAction } from 'react';

export const validateMinLength = (
	value: string,
	minLength: number,
	label: string,
	setErrFunc: (errorText: SetStateAction<string>) => void
) => {
	if (value.trim().length < minLength) {
		setErrFunc(`${label} length should be at least ${minLength} characters`);
	} else {
		setErrFunc('');
	}
};
