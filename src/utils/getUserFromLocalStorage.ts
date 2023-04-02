// export const getCartFromLocaleStorage = () => {
//   const data = localStorage.getItem('cart');
//   return data ? JSON.parse(data) as Cart : [] as unknown as Cart;
// }

import { UserState } from 'types/types';

export const getUserFromLocalStorage = (): UserState | null | undefined => {
	const dataFromLS = window.localStorage.getItem('user');

	if (dataFromLS) {
		const user = JSON.parse(dataFromLS);
		if (user) {
			return {
				isAuth: true,
				name: user.user.name,
				email: user.user.email,
				token: user.result,
			};
		} else {
			return null;
		}
	}
};
