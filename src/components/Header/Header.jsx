import { useNavigate } from 'react-router';

import Logo from './components/Logo/Logo';
import Button from 'common/Button/Button';

import styles from './Header.module.scss';

const Header = ({ userName, setUserName }) => {
	const navigate = useNavigate();

	const onLogout = () => {
		setUserName('');
		window.localStorage.removeItem('token');
		navigate('/login');
	};

	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.controls}>
				<div className={styles.userName}>{userName}</div>
				{userName && <Button buttonText='Logout' onClick={onLogout} />}
			</div>
		</header>
	);
};

export default Header;
