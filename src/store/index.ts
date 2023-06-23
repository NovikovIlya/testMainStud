import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'

import AuthRegReducer from './reducers/AuthRegReducer'
import FormReducer from './reducers/FormReducer'
import ProfileReducer from './reducers/ProfileReducer'

export const store = configureStore({
	reducer: {
		AuthReg: AuthRegReducer,
		Profile: ProfileReducer,
		Form: FormReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			...(process.env.NODE_ENV !== 'production' ? [logger] : [])
		)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector