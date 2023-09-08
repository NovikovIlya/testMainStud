import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'

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
import { countriesAPi } from './slice/countrySlice'
import { documentsAPi } from './slice/documentSlice'
import { educationLevelAPi } from './slice/educationLevelSlice'
import { scheduleApi, sessionApi } from './slice/scheduleSlice'

export const store = configureStore({
	reducer: {
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
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
