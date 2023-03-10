import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Input from 'common/Input/Input';
import Button from 'common/Button/Button';

import styles from './Login.module.scss';
import axios from 'utils/axios';

const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();
		const user = {
			password,
			email,
		};

		try {
			const { data } = await axios.post('/login', user);
			window.localStorage.setItem('token', data.result);
			navigate('/courses');
		} catch (error) {
			console.log(error.response.data);
			alert('Failed to login');
		}
	};

	return (
		<div className={styles.login}>
			<form onSubmit={onSubmit}>
				<h2>Login</h2>
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
				<Button type='submit' buttonText='Login' />
				<div>
					If you not have an account you can{' '}
					<Link to='/registration'>Registration</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
