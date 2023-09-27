import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'

import { apiSlice } from './api/apiSlice'
import { countriesAPi } from './api/countryApi'
import { documentsAPi } from './api/documentApi'
import { educationLevelAPi } from './api/educationLevelApi'
import { scheduleApi, sessionApi } from './api/scheduleApi'
import AuthRegReducer from './reducers/AuthRegReducer'
import AddressReducer from './reducers/FormReducers/AddressReducer'
import CountriesEducationReducer from './reducers/FormReducers/CountriesEducationReducer'
import DocumentReducer from './reducers/FormReducers/DocumentReducer'
import EducationReducer from './reducers/FormReducers/EducationReducer'
import FormReducer from './reducers/FormReducers/FormReducer'
import InfoUserReducer from './reducers/FormReducers/InfoUserReducer'
import ParentReducer from './reducers/FormReducers/ParentReducer'
import WorkReducer from './reducers/FormReducers/WorkReducer'
import ProfileReducer from './reducers/ProfileReducer'
import authReducer from './reducers/authSlice'
import authSlice from './reducers/authSlice'

export const store = configureStore({
	reducer: {
		auth: authSlice,
		AuthReg: AuthRegReducer,
		Profile: ProfileReducer,
		InfoUser: InfoUserReducer,
		Form: FormReducer,
		Document: DocumentReducer,
		Education: EducationReducer,
		Work: WorkReducer,
		Parent: ParentReducer,
		Address: AddressReducer,
		CountriesEducation: CountriesEducationReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		[sessionApi.reducerPath]: sessionApi.reducer,
		[scheduleApi.reducerPath]: scheduleApi.reducer,
		[countriesAPi.reducerPath]: countriesAPi.reducer,
		[educationLevelAPi.reducerPath]: educationLevelAPi.reducer,
		[documentsAPi.reducerPath]: documentsAPi.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(...(process.env.NODE_ENV !== 'production' ? [logger] : []))
			.concat(scheduleApi.middleware)
			.concat(countriesAPi.middleware)
			.concat(educationLevelAPi.middleware)
			.concat(documentsAPi.middleware)
			.concat(sessionApi.middleware)
			.concat(apiSlice.middleware),
	devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
