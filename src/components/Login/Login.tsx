import { Link, useNavigate } from 'react-router-dom';
import React, { FC, FormEvent, useState } from 'react';

import Input from 'common/Input';
import Button from 'common/Button';

import { ENGLISH } from '../../constants';
import url from 'urls';

import styles from './Login.module.scss';
import useCoursesService from 'services';
import { useAppDispatch } from 'store/index';
import { login } from 'store/user/reducer';
import { fetchMe } from 'store/user/thunk';

const Login: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { postLogin } = useCoursesService();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const loginData = {
			password,
			email,
		};
		postLogin(loginData)
			.then(({ data }) => {
				const token = data.result;
				dispatch(login(token));
				return token;
			})
			.then((token) => dispatch(fetchMe(token)))
			.then(() => navigate(url.courses))
			.catch((e) => setError(e.message));
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
					<Link to={url.registration}> {ENGLISH.BUTTON.REGISTRATION}</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
