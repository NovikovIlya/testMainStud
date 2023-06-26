import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'

import AuthRegReducer from './reducers/AuthRegReducer'
import DocumentReducer from './reducers/FormReducers/DocumentReducer'
import EducationReducer from './reducers/FormReducers/EducationReducer'
import FormReducer from './reducers/FormReducers/FormReducer'
import InfoUserReducer from './reducers/FormReducers/InfoUserReducer'
import ParentReducer from './reducers/FormReducers/ParentReducer'
import WorkReducer from './reducers/FormReducers/WorkReducer'
import ProfileReducer from './reducers/ProfileReducer'

export const store = configureStore({
	reducer: {
		AuthReg: AuthRegReducer,
		Profile: ProfileReducer,
		InfoUser: InfoUserReducer,
		Form: FormReducer,
		Document: DocumentReducer,
		Education: EducationReducer,
		Work: WorkReducer,
		Parent: ParentReducer
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
