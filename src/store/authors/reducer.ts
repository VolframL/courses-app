import { createSlice } from '@reduxjs/toolkit';
import { AuthorsSliceState, Status } from 'types';
import { fetchAuthors } from './thunk';

const initialState: AuthorsSliceState = {
	items: [],
	status: Status.LOADING,
};

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		//@ts-ignore
		// setAuthors: (state, { payload }) => (state = payload),
		// addAuthor: (state, { payload }) => (state = [...state, payload]),
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAuthors.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(fetchAuthors.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = [];
		});
		builder.addCase(fetchAuthors.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
			state.items = action.payload.result;
		});
	},
});

// export const { setAuthors, addAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
