import React, { FC } from 'react';
import { useNavigate } from 'react-router';

import Logo from './components/Logo';
import Button from 'common/Button';

import styles from './Header.module.scss';

import { getUser } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'store/index';
import { logout } from 'store/user/reducer';
import useCoursesService from 'services';

const Header: FC = () => {
	const { postLogout } = useCoursesService();
	const user = useAppSelector(getUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		postLogout(user.token)
			.then(() => {
				dispatch(logout());
				window.localStorage.removeItem('courses');
				navigate('/login');
			})
			.catch((e) => {
				console.log('Error logout ' + e);
			});
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
