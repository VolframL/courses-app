import { AuthorType } from 'types/types';

export const returnAuthorsIdArr = (courseAuthorList: AuthorType[]) =>
	courseAuthorList.map((author) => author.id);
