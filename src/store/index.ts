import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'

import { apiSlice } from './api/apiSlice'
import CurrentVacancyNameSlice from './reducers/CurrentVacancyNameSlice'
import CurrentVacancySlice from './reducers/CurrentVacancySlice'
import AddressReducer from './reducers/FormReducers/AddressReducer'
import CountriesEducationReducer from './reducers/FormReducers/CountriesEducationReducer'
import DocumentReducer from './reducers/FormReducers/DocumentReducer'
import EducationReducer from './reducers/FormReducers/EducationReducer'
import FormReducer from './reducers/FormReducers/FormReducer'
import InfoUserReducer from './reducers/FormReducers/InfoUserReducer'
import ParentReducer from './reducers/FormReducers/ParentReducer'
import WorkReducer from './reducers/FormReducers/WorkReducer'
import LayoutSlice from './reducers/LayoutsSlice'
import AboutMeReducer from './reducers/SeekerFormReducers/AboutMeReducer'
import ExperienceReducer from './reducers/SeekerFormReducers/ExperienceReducer'
import FormCompletionReducer from './reducers/SeekerFormReducers/FormCompletionReducer'
import RespondEducationReducer from './reducers/SeekerFormReducers/RespondEducationReducer'
import SkillsReducer from './reducers/SeekerFormReducers/SkillsReducer'
import authSlice from './reducers/authSlice'

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
		currentVacancy: CurrentVacancySlice,
		currentVacancyName: CurrentVacancyNameSlice,
		seekerAboutMe: AboutMeReducer,
		skills: SkillsReducer,
		RespondEducation: RespondEducationReducer,
		Experience: ExperienceReducer,
		formCompletion: FormCompletionReducer,
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
