import { UserState } from 'types/types';

import { createSlice } from '@reduxjs/toolkit';
import { fetchMe, logout } from './thunk';

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
			state.token = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMe.fulfilled, (state, { payload }) => {
			state.isAuth = true;
			state.name = payload.result.name;
			state.email = payload.result.email;
			state.role = payload.result.role;
		});
		builder.addCase(fetchMe.rejected, (_state, { payload }) => {
			throw new Error(JSON.stringify(payload));
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.isAuth = false;
			state.name = '';
			state.email = '';
			state.token = '';
			state.role = '';
		});
	},
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
