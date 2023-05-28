import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'

import AuthRegReducer from './reducers/AuthRegReducer'
import ProfileReducer from './reducers/ProfileReducer'

export const store = configureStore({
	reducer: {
		AuthReg: AuthRegReducer,
		Profile: ProfileReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			...(process.env.NODE_ENV !== 'production' ? [logger] : [])
		)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
