import { ChangeEvent, SetStateAction } from 'react';
import { validateMinLength } from 'helpers';

export const onInput = (
	e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
	title: string,
	minLength: number,
	setFunc: {
		(value: SetStateAction<string>): void;
	},
	setErrorFunc: {
		(errorText: SetStateAction<string>): void;
	}
) => {
	const { value } = e.target;
	setFunc(value);
	validateMinLength(value, minLength, title, setErrorFunc);
};
