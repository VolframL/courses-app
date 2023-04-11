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
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

// type AppDispatch = typeof store.dispatch;
// type DispatchFunc = () => AppDispatch;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
