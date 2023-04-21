import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { PrivateRouterProps } from 'types';
import url from 'urls';

const PrivateRouter: FC<PrivateRouterProps> = ({ children, role }) =>
	role === 'admin' ? (
		<>{children}</>
	) : (
		<Navigate to={url.courses} replace={true} />
	);

export default PrivateRouter;
