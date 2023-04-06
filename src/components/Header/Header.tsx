import React, { FC } from 'react';
import { useNavigate } from 'react-router';

import Logo from './components/Logo/Logo';
import Button from 'common/Button/Button';

import styles from './Header.module.scss';

import { ActionCreators } from 'store/user/actionCreators';
import { getUser } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'store/index';

const Header: FC = () => {
	const user = useAppSelector(getUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(ActionCreators.logout());
		window.localStorage.removeItem('user');
		navigate('/login');
	};

	return (
		<header className={styles.wrapper}>
			<Logo />
			<div className={styles.controls}>
				<div className={styles.userName}>{user.name}</div>
				{user.isAuth && <Button onClick={onLogout}>Logout</Button>}
			</div>
		</header>
	);
};

export default Header;
