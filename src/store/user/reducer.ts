import { UserState } from 'types/types';

import { createSlice } from '@reduxjs/toolkit';
import { fetchMe } from './thunk';

const initialState: UserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }) => {
			state.isAuth = true;
			state.token = payload;
		},
		logout: (state) => {
			state.isAuth = false;
			state.name = '';
			state.email = '';
			state.token = '';
		},
		setRole: (state, { payload }) => {
			state.role = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMe.fulfilled, (state, { payload }) => {
			state.name = payload.result.name;
			state.email = payload.result.email;
			state.role = payload.result.role;
		});
	},
});

export const { login, logout, setRole } = userSlice.actions;

export default userSlice.reducer;
