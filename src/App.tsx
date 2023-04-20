import { useNavigate } from 'react-router-dom';
import React, { FC } from 'react';

import Header from 'components/Header';
import Router from 'Router';

import { useAppDispatch, useAppSelector } from 'store/index';
import { logout } from 'store/user/thunk';
import { getUser } from 'store/selectors';

import './App.scss';

const App: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector(getUser);

	const onLogout = () => {
		dispatch(logout(user.token))
			.then(() => {
				navigate('/login');
			})
			.catch((e) => console.log('Error logout ' + e));
	};

	return (
		<div className={'app'}>
			<Header user={user} onLogout={onLogout} />
			<main className={'main'}>
				<Router user={user} />
			</main>
		</div>
	);
};

export default App;
