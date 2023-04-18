import { Link, useNavigate } from 'react-router-dom';
import React, { FC, FormEvent, useState } from 'react';

import Input from 'common/Input';
import Button from 'common/Button';

import { ENGLISH } from '../../constants';

import styles from './Login.module.scss';
import useCoursesService from 'services';
import { useAppDispatch } from 'store/index';
import { login } from 'store/user/reducer';

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
				dispatch(login(data.result));
				return data;
			})
			.then(() => navigate('/courses'))
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
					<Link to='/registration'> {ENGLISH.BUTTON.REGISTRATION}</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
