import { UserData } from 'types/types';
import { Types } from './actionTypes';

export const ActionCreators = {
	login: (value: UserData) => ({
		type: Types.LOGIN,
		payload: value,
	}),

	logout: () => ({
		type: Types.LOGOUT,
	}),

	setRole: (value: string) => ({
		type: Types.SET_ROLE,
		payload: value,
	}),
};
