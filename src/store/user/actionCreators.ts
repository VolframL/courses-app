import { UserData } from 'types/types';
import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

export const login = (value: UserData) => ({
	type: USER_LOGIN,
	payload: value,
});

export const logout = () => ({
	type: USER_LOGOUT,
});
