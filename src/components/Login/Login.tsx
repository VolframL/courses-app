import { Link, useNavigate } from 'react-router-dom';
import React, { FC, FormEvent, useEffect, useState } from 'react';

import Input from 'common/Input/Input';
import Button from 'common/Button/Button';

import { ENGLISH } from '../../constants';

import styles from './Login.module.scss';
import axios, { AxiosError } from 'utils/axios';

import { UserNameProps, UserData } from 'types';

const Login: FC<UserNameProps> = ({ userName, setUserName }) => {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (!userName) {
			navigate('/login');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (userName) {
			navigate('/courses');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userName]);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const user = {
			password,
			email,
		};

		try {
			const { data } = await axios.post<any, UserData>('/login', user);
			window.localStorage.setItem('token-courses', JSON.stringify(data));
			setUserName(data.user.name);
			navigate('/courses');
		} catch (error: AxiosError | unknown) {
			const err: any = error as AxiosError;
			if (err.toJSON().message === 'Network Error') {
				alert('No connection to the server, try again later');
			} else if (err.toJSON().status >= 400 && err.toJSON().status <= 499) {
				setError(err.response?.data?.result);
			} else {
				alert('Unknown error, please try again later');
			}
		}
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
				<Button type='submit' buttonText={ENGLISH.BUTTON.LOGIN} />
				<div>
					{ENGLISH.TEXT.LOGIN_PAGE}
					<Link to='/registration'> {ENGLISH.BUTTON.REGISTRATION}</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
