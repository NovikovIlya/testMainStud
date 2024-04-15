import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'
import { apiSlice } from './api/apiSlice'
import AddressReducer from './reducers/FormReducers/AddressReducer'
import CountriesEducationReducer from './reducers/FormReducers/CountriesEducationReducer'
import DocumentReducer from './reducers/FormReducers/DocumentReducer'
import EducationReducer from './reducers/FormReducers/EducationReducer'
import FormReducer from './reducers/FormReducers/FormReducer'
import InfoUserReducer from './reducers/FormReducers/InfoUserReducer'
import ParentReducer from './reducers/FormReducers/ParentReducer'
import WorkReducer from './reducers/FormReducers/WorkReducer'
import LayoutSlice from './reducers/LayoutsSlice'
import authSlice from './reducers/authSlice'
import StaffStepFormBusinessTrip from "./reducers/FormReducers/StaffStepFormBusinessTrip";
import StaffItemTabsReducer from "./reducers/FormReducers/StaffItemTabsReducer";
import SecretaryStepFormBusinessTrip from "./reducers/FormReducers/SecretaryStepFormBusinessTrip";
import SecretaryItemTabsReducer from "./reducers/FormReducers/SecretaryItemTabsReducer";


export const store = configureStore({
	reducer: {
		auth: authSlice,
		Layout: LayoutSlice,
		InfoUser: InfoUserReducer,
		Form: FormReducer,
		Document: DocumentReducer,
		Education: EducationReducer,
		Work: WorkReducer,
		Parent: ParentReducer,
		Address: AddressReducer,
		CountriesEducation: CountriesEducationReducer,
		StaffStepFormBusinessTrip: StaffStepFormBusinessTrip,
		StaffItemTabs: StaffItemTabsReducer,
		SecretaryStepFormBusinessTrip: SecretaryStepFormBusinessTrip,
		SecretaryItemTabs: SecretaryItemTabsReducer,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(...(process.env.NODE_ENV !== 'production' ? [logger] : []))
			.concat(apiSlice.middleware),
	devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
