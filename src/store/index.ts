import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'

import AuthRegReducer from './reducers/AuthRegReducer'
import ProfileReducer from './reducers/ProfileReducer'
import { approveApi } from './service/ApproveService'

export const store = configureStore({
	reducer: {
		AuthReg: AuthRegReducer,
		Profile: ProfileReducer,
		[approveApi.reducerPath]: approveApi.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(...(process.env.NODE_ENV !== 'production' ? [logger] : []))
			.concat(approveApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
