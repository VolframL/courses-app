import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import Logo from './components/Logo';
import Button from 'common/Button';
import url from 'urls';

import styles from './Header.module.scss';

import { HeaderProps } from 'types';

const Header: FC<HeaderProps> = ({ user, onLogout }) => (
	<header className={styles.wrapper}>
		<Link to={url.home}>
			<Logo />
		</Link>
		<div className={styles.controls}>
			<div className={styles.userName}>{user.name}</div>
			{user.token && <Button onClick={onLogout}>Logout</Button>}
		</div>
	</header>
);

export default Header;
