import { createAsyncThunk } from '@reduxjs/toolkit';
import useCoursesService from 'services';

export const fetchMe = createAsyncThunk(
	'user/fetchMe',
	async (token: string, thunkAPI) => {
		const { userMe } = useCoursesService();
		try {
			return await userMe(token);
			// @ts-ignore
		} catch (error: AxiosError) {
			return thunkAPI.rejectWithValue(error.response.data.errors);
		}
	}
);

export const logout = createAsyncThunk('user/logout', async (token: string) => {
	const { postLogout } = useCoursesService();
	const res = await postLogout(token);
	return res;
});

// export const addAuthor = createAsyncThunk(
// 	'courses/addAuthor',
// 	async (data: { token: string; author: string }, thunkAPI) => {
// 		const { createAuthor } = useCoursesService();
// 		try {
// 			return await createAuthor(data.token, data.author);
// 			// @ts-ignore
// 		} catch (error: AxiosError) {
// 			return thunkAPI.rejectWithValue(error.response.data.errors);
// 		}
// 	}
// );
