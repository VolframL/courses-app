import { useLocation, useNavigate } from 'react-router-dom';
import React, { FC, useEffect } from 'react';

import Header from 'components/Header';
import Router from 'Router';

import { useAppDispatch, useAppSelector } from 'store/index';
import { fetchMe, logout } from 'store/user/thunk';
import { getUser } from 'store/selectors';

import './App.scss';
import { login } from 'store/user/reducer';

const App: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector(getUser);
	const { pathname } = useLocation();

	const checkStorage = () => {
		const token = window.localStorage.getItem('token');
		if (!token) {
			pathname === '/' || pathname === '/courses'
				? navigate('/login')
				: navigate(pathname);
		} else {
			dispatch(login(token));
			dispatch(fetchMe())
				.then(() => {
					pathname === '/' ? navigate('/courses') : navigate(pathname);
				})
				.catch((e) => {
					window.localStorage.removeItem('token');
					console.log('old token' + e);
				});
		}
	};

	useEffect(() => {
		if (!user.isAuth) {
			checkStorage();
		} else if (user.isAuth) {
			pathname === '/' ? navigate('/courses') : navigate(pathname);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const onLogout = () => {
		dispatch(logout())
			.then(() => {
				navigate('/login');
			})
			.catch((e) => console.log('Error logout ' + e));
	};

	return (
		<div className={'app'}>
			<Header user={user} onLogout={onLogout} />
			<main className={'main'}>
				{user.isAuth ? <Router user={user} /> : <div>Loading</div>}
			</main>
		</div>
	);
};

export default App;
