import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/index';
import { getUser } from 'store/selectors';

const PrivateRouter = ({ children }) => {
	const navigate = useNavigate();
	const user = useAppSelector(getUser);
	const { role } = user;

	if (role === 'admin') {
		return <div>{children}</div>;
	} else {
		navigate('/courses');
	}
};

export default PrivateRouter;
