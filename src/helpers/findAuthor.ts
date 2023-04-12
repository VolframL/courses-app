import { AuthorType } from 'types/types';

export const findAuthor = (authorsId: string[], authorList: AuthorType[]) => {
	if (authorList.length) {
		const arr: string[] = [];
		authorsId.forEach((item) => {
			arr.push(authorList.filter((author) => author.id === item)[0].name);
		});
		return arr;
	} else {
		return [];
	}
};
