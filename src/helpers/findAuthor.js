import { mockedAuthorsList } from 'constants';

export const findAuthor = (authorsId) => {
	const arr = [];
	authorsId.forEach((item) => {
		arr.push(mockedAuthorsList.filter((author) => author.id === item)[0].name);
	});
	return arr;
};
