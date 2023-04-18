import { useNavigate } from 'react-router-dom';
import React, { FC } from 'react';

import Header from 'components/Header';
import Router from 'Router';

import { useAppDispatch, useAppSelector } from 'store/index';
import { logout } from 'store/user/reducer';
import { getUser } from 'store/selectors';
import useCoursesService from 'services';

import './App.scss';

const App: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { postLogout } = useCoursesService();

	const { token, name } = useAppSelector(getUser);

	const onLogout = () => {
		postLogout(token)
			.then(() => {
				dispatch(logout());
				navigate('/login');
			})
			.catch((e) => {
				console.log('Error logout ' + e);
			});
	};

	return (
		<div className={'app'}>
			<Header userName={name} token={token} onLogout={onLogout} />
			<main className={'main'}>
				<Router />
			</main>
		</div>
	);
};

export default App;
