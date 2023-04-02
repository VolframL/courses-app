import { UserData, UserState } from 'types/types';
import { getUserFromLocalStorage } from 'utils/getUserFromLocalStorage';
import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

const initialState: UserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const userReducer = (
	state = getUserFromLocalStorage() || initialState,
	action: { type: string; payload?: UserData }
) => {
	switch (action.type) {
		case USER_LOGIN:
			return {
				...state,
				isAuth: true,
				name: action.payload?.user.name,
				email: action.payload?.user.email,
				token: action.payload?.result,
			};
		case USER_LOGOUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		default:
			return state;
	}
};
