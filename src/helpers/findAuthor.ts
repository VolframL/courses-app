import { mockedAuthorsList } from '../constants';

export const findAuthor = (authorsId: string[]) => {
	const arr: string[] = [];
	authorsId.forEach((item) => {
		arr.push(mockedAuthorsList.filter((author) => author.id === item)[0].name);
	});
	return arr;
};
