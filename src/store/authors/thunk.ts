import { createAsyncThunk } from '@reduxjs/toolkit';
import useCoursesService from 'services';

export const setAuthors = createAsyncThunk(
	'courses/setAuthors',
	async (_, thunkAPI) => {
		const { fetchAllAuthors } = useCoursesService();
		try {
			const { data } = await fetchAllAuthors();
			return data;
			// @ts-ignore
		} catch (error: AxiosError) {
			return thunkAPI.rejectWithValue(error.response.data.errors);
		}
	}
);

export const addAuthor = createAsyncThunk(
	'courses/addAuthor',
	async (author: string, thunkAPI) => {
		const { createAuthor } = useCoursesService();
		try {
			return await createAuthor(author);
			// @ts-ignore
		} catch (error: AxiosError) {
			return thunkAPI.rejectWithValue(error.response.data.errors);
		}
	}
);
