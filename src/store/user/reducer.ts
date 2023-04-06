import { UserData, UserState } from 'types/types';
import { getUserFromLocalStorage } from 'utils/getUserFromLocalStorage';
import { Types } from './actionTypes';

const initialState: UserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export const userReducer = (
	state = getUserFromLocalStorage() || initialState,
	action: { type: string; payload?: UserData }
) => {
	switch (action.type) {
		case Types.LOGIN:
			return {
				...state,
				isAuth: true,
				name: action.payload?.user.name,
				email: action.payload?.user.email,
				token: action.payload?.result,
			};
		case Types.LOGOUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
				role: '',
			};
		case Types.SET_ROLE:
			return {
				...state,
				role: action.payload,
			};
		default:
			return state;
	}
};
