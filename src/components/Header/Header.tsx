import React, { FC } from 'react';
import { useNavigate } from 'react-router';

import Logo from './components/Logo';
import Button from 'common/Button';

import styles from './Header.module.scss';

import { useAppDispatch } from 'store/index';
import { logout } from 'store/user/reducer';
import useCoursesService from 'services';

type HeaderProps = {
	userName: string;
	token: string;
};

const Header: FC<HeaderProps> = ({ userName, token }) => {
	const { postLogout } = useCoursesService();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		postLogout(token)
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
				<div className={styles.userName}>{userName}</div>
				{token && <Button onClick={onLogout}>Logout</Button>}
			</div>
		</header>
	);
};

export default Header;
