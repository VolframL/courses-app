import Logo from './components/Logo/Logo';
import Button from 'common/Button/Button';
import styles from './Header.module.scss';

const Header = () => {
	const userName = 'Vitalii';

	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.controls}>
				<div className={styles.userName}>{userName}</div>
				<Button buttonText='Logout' />
			</div>
		</header>
	);
};

export default Header;
