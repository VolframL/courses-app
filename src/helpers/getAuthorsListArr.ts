import { AuthorType } from 'types/types';

export const getAuthorsListArr = (
	authorsId: string[],
	authorList: AuthorType[]
) =>
	authorsId.map(
		(item) => authorList.filter((author) => author.id === item)[0].name
	);
