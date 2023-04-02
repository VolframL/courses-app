import { AuthorType } from 'types/types';
import { SET_AUTHORS, CREATE_AUTHOR } from './actionTypes';

export const setAuthors = (data: AuthorType[]) => ({
	type: SET_AUTHORS,
	payload: data,
});
export const createAuthor = (author: AuthorType) => ({
	type: CREATE_AUTHOR,
	payload: author,
});
