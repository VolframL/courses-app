import React, { FC } from 'react';

import logo from 'assets/img/logo.png';

import styles from './Logo.module.scss';

const Logo: FC = () => <img className={styles.logo} src={logo} alt='logo' />;

export default Logo;
