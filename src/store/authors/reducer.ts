import { createSlice } from '@reduxjs/toolkit';
import { AuthorType } from 'types';
import { deleteAuthor, addAuthor, setAuthors } from './thunk';

const initialState: never[] | AuthorType[] = [];

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			setAuthors.fulfilled,
			(_state, { payload }) => payload.result
		);
		builder.addCase(deleteAuthor.fulfilled, (state, action) => {
			const { id } = action.meta.arg;
			return (state = state.filter((author) => author.id !== id));
		});
		builder.addCase(addAuthor.pending, () => {
			console.log('try to add new author');
		});
		builder.addCase(addAuthor.rejected, (_state, { payload }) => {
			throw new Error(JSON.stringify(payload));
		});
		builder.addCase(addAuthor.fulfilled, (state, { payload }) => {
			const author = payload.data.result;
			return (state = [...state, author]);
		});
	},
});

export default authorsSlice.reducer;
