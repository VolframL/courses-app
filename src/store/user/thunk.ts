import { createAsyncThunk } from '@reduxjs/toolkit';
import useCoursesService from 'services';
import { AxiosError } from 'utils/axios';

export const fetchMe = createAsyncThunk('user/fetchMe', async (_, thunkAPI) => {
	const { userMe } = useCoursesService();
	try {
		const { data } = await userMe();
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.response?.data.errors);
		}
	}
});

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
	const { postLogout } = useCoursesService();
	try {
		return await postLogout();
	} catch (error) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.response?.data.errors);
		}
	}
});
