import React from 'react';
import { Link } from 'react-router-dom';
import url from 'urls';
import styles from './Page404.module.scss';

const Page404 = () => {
	return (
		<div className={styles.wrapper}>
			<h1>Page not found</h1>
			<Link to={url.home}>Go to Home</Link>
		</div>
	);
};

export default Page404;
