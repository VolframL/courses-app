import { Link, useNavigate } from 'react-router-dom';
import React, { FC, FormEvent, useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import Input from 'common/Input/Input';
import Button from 'common/Button/Button';

import { ENGLISH } from '../../constants';

import styles from './Login.module.scss';
import { ActionCreators } from 'store/user/actionCreators';
import useCoursesService from 'services';
import { useAppDispatch, useAppSelector } from 'store/index';
import { loginThunk } from 'store/user/thunk';
import { getUser } from 'store/selectors';

const Login: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector(getUser);

	const { postLogin } = useCoursesService();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		console.log(user);
	}, [user]);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const loginData = {
			password,
			email,
		};

		dispatch(loginThunk(loginData));
		// try {
		// 	postLogin(loginData)
		// 		.then(({ data }) => {
		// 			dispatch(ActionCreators.login(data));
		// 			return data;
		// 		})
		// 		.then((data) =>
		// 			window.localStorage.setItem('user', JSON.stringify(data))
		// 		)
		// 		.then(() => navigate('/courses'));
		// } catch (error: AxiosError | unknown) {
		// 	const err: any = error as AxiosError;
		// 	if (err.toJSON().message === 'Network Error') {
		// 		alert('No connection to the server, try again later');
		// 	} else if (err.toJSON().status >= 400 && err.toJSON().status <= 499) {
		// 		setError(err.response?.data?.result);
		// 	} else {
		// 		alert('Unknown error, please try again later');
		// 	}
		// }
	};

	return (
		<div className={styles.login}>
			<form onSubmit={onSubmit}>
				<h2>{ENGLISH.BUTTON.LOGIN}</h2>
				<Input
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					type='email'
					labelText={ENGLISH.INPUT.EMAIL.LABEL}
					placeholderText={ENGLISH.INPUT.EMAIL.PLACEHOLDER}
				/>
				<Input
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					type='password'
					labelText={ENGLISH.INPUT.PASSWORD.LABEL}
					placeholderText={ENGLISH.INPUT.PASSWORD.PLACEHOLDER}
				/>
				<div className={'error'}>{error}</div>
				<Button type='submit'>{ENGLISH.BUTTON.LOGIN}</Button>
				<div>
					{ENGLISH.TEXT.LOGIN_PAGE}
					<Link to='/registration'> {ENGLISH.BUTTON.REGISTRATION}</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
