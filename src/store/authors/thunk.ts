import { createAsyncThunk } from '@reduxjs/toolkit';
import useCoursesService from 'services';

export const setAuthors = createAsyncThunk('courses/setAuthors', async () => {
	const { fetchAllAuthors } = useCoursesService();
	const res = await fetchAllAuthors();
	return res;
});

export const deleteAuthor = createAsyncThunk(
	'courses/deleteAuthor',
	async (data: { token: string; id: string }) => {
		const { deleteAuthorById } = useCoursesService();
		const res = await deleteAuthorById(data.token, data.id);
		return res;
	}
);

export const addAuthor = createAsyncThunk(
	'courses/addAuthor',
	async (data: { token: string; author: string }, thunkAPI) => {
		const { createAuthor } = useCoursesService();
		try {
			return await createAuthor(data.token, data.author);
			// @ts-ignore
		} catch (error: AxiosError) {
			return thunkAPI.rejectWithValue(error.response.data.errors);
		}
	}
);
