import { createSlice } from '@reduxjs/toolkit';
import { AuthorType } from 'types';

const initialState: never[] | AuthorType[] = [];

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		//@ts-ignore
		setAuthors: (state, { payload }) => (state = payload),
		addAuthor: (state, { payload }) => (state = [...state, payload]),
	},
});

export const { setAuthors, addAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
