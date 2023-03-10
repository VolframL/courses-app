import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Input from 'common/Input/Input';
import Button from 'common/Button/Button';

import styles from './Registration.module.scss';
import axios from 'utils/axios';

const Registration = () => {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();
		const newUser = {
			name,
			password,
			email,
		};

		try {
			await axios.post('/register', newUser);
			navigate('/login');
		} catch (error) {
			console.log(error.response.data);
			alert('Failed to register, status');
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
				<Button type='submit' buttonText='Registration' />
				<div>
					If you have an account you can <Link to='/login'>Login</Link>
				</div>
			</form>
		</div>
	);
};

export default Registration;
