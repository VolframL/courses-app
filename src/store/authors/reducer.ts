import { AuthorType } from 'types/types';
import { GET_AUTHORS, CREATE_AUTHOR } from './actionTypes';

const initialState: never[] = [];

export const authorsReducer = (
	state: AuthorType[] | never[] = initialState,
	action: { type: string; payload: AuthorType[] | AuthorType }
) => {
	switch (action.type) {
		case GET_AUTHORS:
			return action.payload;
		case CREATE_AUTHOR:
			return [...state, action.payload];
		default:
			return state;
	}
};
