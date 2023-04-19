import {
	AnyAction,
	Store,
	ThunkDispatch,
	configureStore,
} from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import coursesReducer from './courses/reducer';
import authorsReducer from './authors/reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const store: Store = configureStore({
	reducer: {
		user: userReducer,
		courses: coursesReducer,
		authors: authorsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

store.subscribe(() => {
	const localStorageToken = window.localStorage.getItem('token');
	const reduxToken = store.getState().user.token;
	if (reduxToken) {
		if (localStorageToken !== reduxToken) {
			window.localStorage.setItem('token', reduxToken);
		}
	} else if (!reduxToken) {
		window.localStorage.removeItem('token');
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
