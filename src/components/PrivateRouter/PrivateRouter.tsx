import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { getRole } from 'store/selectors';
import url from 'urls';

const PrivateRouter = ({ children }: { children: JSX.Element }) => {
	const role = useAppSelector(getRole);

	if (role === 'admin') {
		return <>{children}</>;
	} else {
		return <Navigate to={url.courses} replace={true} />;
	}
};

export default PrivateRouter;
