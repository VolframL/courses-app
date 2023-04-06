import { ActionCreators } from './actionCreators';
import useCoursesService from 'services';
// import { LoginPayload, UserData } from 'types/types';
// import { ThunkDispatch } from 'redux-thunk';
// import { RootState } from 'store/index';
// import { AnyAction } from 'redux';

export const loginThunk = (loginData) => (dispatch, getState) => {
	const { userMe, postLogin } = useCoursesService();

	postLogin(loginData)
		.then(({ data }) => {
			dispatch(ActionCreators.login(data));
			return data;
		})
		.then((data) => window.localStorage.setItem('user', JSON.stringify(data)))
		.then(() => {
			const localStorage = window.localStorage.getItem('user');

			if (localStorage) {
				const token = JSON.parse(localStorage).result;
				userMe(token)
					.then(({ result }) => dispatch(ActionCreators.setRole(result.role)))
					.catch((err) => console.log(err));
			}
		})
		.catch((err) => console.log(err));
};
