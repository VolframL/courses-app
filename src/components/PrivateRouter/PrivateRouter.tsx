import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { getRole } from 'store/selectors';

const PrivateRouter = ({ children }: { children: JSX.Element }) => {
	const role = useAppSelector(getRole);

	if (role === 'admin') {
		return <div>{children}</div>;
	} else {
		return <Navigate to='/courses' replace={true} />;
	}
};

export default PrivateRouter;
