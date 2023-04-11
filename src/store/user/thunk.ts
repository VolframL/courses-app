import { createAsyncThunk } from '@reduxjs/toolkit';
import useCoursesService from 'services';

export const fetchMe = createAsyncThunk(
	'user/fetchMe',
	async (token: string) => {
		const { userMe } = useCoursesService();
		const res = await userMe(token);
		return res;
	}
);
