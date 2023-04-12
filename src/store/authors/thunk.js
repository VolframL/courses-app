import { createAsyncThunk } from '@reduxjs/toolkit';
import useCoursesService from 'services';

export const fetchAuthors = createAsyncThunk(
	'authors/fetchAuthors',
	async () => {
		const { fetchAllAuthors } = useCoursesService();
		const res = await fetchAllAuthors();
		return res;
	}
);
