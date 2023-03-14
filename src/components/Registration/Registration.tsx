import { Link, useNavigate } from 'react-router-dom';
import React, { FC, FormEvent, useState } from 'react';

import Input from 'common/Input/Input';
import Button from 'common/Button/Button';

import styles from './Registration.module.scss';
import axios, { AxiosError } from 'utils/axios';

const Registration: FC = () => {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const newUser = {
			name,
			password,
			email,
		};

		try {
			await axios.post('/register', newUser);
			navigate('/login');
		} catch (error: AxiosError | unknown) {
			const err: any = error as AxiosError;
			if (err.toJSON().message === 'Network Error') {
				alert('No internet connection');
			} else if (err.toJSON().status >= 400 && err.toJSON().status <= 499) {
				const { status, data } = err.response;
				console.log(data);
				console.log(status);
				setError(err.response?.data?.errors[0]);
			} else {
				alert('Unknown error, please try again later');
			}
		}
	};

	return (
		<div className={styles.registration}>
			<form onSubmit={onSubmit}>
				<h2>Registration</h2>
				<Input
					onChange={(e) => setName(e.target.value)}
					value={name}
					name='name'
					labelText='Name'
					placeholderText='Enter name'
				/>
				<Input
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					type='email'
					name='email'
					labelText='Email'
					placeholderText='Enter email'
				/>
				<Input
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					name='password'
					type='password'
					labelText='Password'
					placeholderText='Enter password'
				/>
				<div className={styles.error}>{error}</div>
				<Button type='submit' buttonText='Registration' />
				<div>
					If you have an account you can <Link to='/login'>Login</Link>
				</div>
			</form>
		</div>
	);
};

export default Registration;
