import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'

import { apiSlice } from './api/apiSlice'
import { practiceApi } from './api/practiceApi/practiceApi'
import ChatRespondStatusSlice from './reducers/ChatRespondStatusSlice'
import CurrentEmploymentStage from './reducers/CurrentEmploymentStage'
import CurrentInterviewFormatSlice from './reducers/CurrentInterviewFormatSlice'
import CurrentInterviewSlice from './reducers/CurrentInterviewSlice'
import CurrentInterviewTimeFormatedSlice from './reducers/CurrentInterviewTimeFormatedSlice'
import CurrentInterviewTimeSlice from './reducers/CurrentInterviewTimeSlice'
import CurrentRequestSlice from './reducers/CurrentRequestSlice'
import CurrentResponceSlice from './reducers/CurrentResponceSlice'
import CurrentRespondIdSlice from './reducers/CurrentRespondIdSlice'
import CurrentVacancyIdSlice from './reducers/CurrentVacancyIdSlice'
import CurrentVacancyNameSlice from './reducers/CurrentVacancyNameSlice'
import CurrentVacancySlice from './reducers/CurrentVacancySlice'
import EmploymentDataSlice from './reducers/EmploymentDataSlice'
import EmploymentProgressSlice from './reducers/EmploymentProgressSlice'
import EmploymentSeekerDocsSlice from './reducers/EmploymentSeekerDocsSlice'
import AddressReducer from './reducers/FormReducers/AddressReducer'
import CountriesEducationReducer from './reducers/FormReducers/CountriesEducationReducer'
import DocumentReducer from './reducers/FormReducers/DocumentReducer'
import EducationReducer from './reducers/FormReducers/EducationReducer'
import FormReducer from './reducers/FormReducers/FormReducer'
import InfoUserReducer from './reducers/FormReducers/InfoUserReducer'
import ParentReducer from './reducers/FormReducers/ParentReducer'
import SecretaryItemTabsReducer from './reducers/FormReducers/SecretaryItemTabsReducer'
import SecretaryStepFormBusinessTrip from './reducers/FormReducers/SecretaryStepFormBusinessTrip'
import StaffItemTabsReducer from './reducers/FormReducers/StaffItemTabsReducer'
import StaffStepFormBusinessTrip from './reducers/FormReducers/StaffStepFormBusinessTrip'
import WorkReducer from './reducers/FormReducers/WorkReducer'
import LayoutSlice from './reducers/LayoutsSlice'
import AboutMeReducer from './reducers/SeekerFormReducers/AboutMeReducer'
import ExperienceReducer from './reducers/SeekerFormReducers/ExperienceReducer'
import FormCompletionReducer from './reducers/SeekerFormReducers/FormCompletionReducer'
import RespondEducationReducer from './reducers/SeekerFormReducers/RespondEducationReducer'
import SkillsReducer from './reducers/SeekerFormReducers/SkillsReducer'
import authSlice from './reducers/authSlice'
import chatIdSlice from './reducers/chatIdSlice'
import notificationSlice from './reducers/notificationSlice'
import inviteSeekerButtonReducer from './reducers/inviteSeekerButtonReducer'
import currentEmploymentSeekerReducer from './reducers/EmploymentStageReducers/EmploymentStageSeekerReducer'
import secondStageStatusSlice from './reducers/EmploymentStageReducers/stages/SecondStageStatusSlice'
import thirdStageStatusSlice from './reducers/EmploymentStageReducers/stages/ThirdStageStatusSlice'
import forthStageStatusSlice from './reducers/EmploymentStageReducers/stages/ForthStageStatusSlice'
import fifthStageStatusSlice from './reducers/EmploymentStageReducers/stages/FifthStageStatusSlice'
import currentRequisiteSeekerReducer from './reducers/RequisiteReducers/RequisiteSeekerReducer'
import currentCommentVisibilitySlice from './reducers/RequisiteReducers/StageCommentReducer'
import secondStageCommentVisibilitySlice from './reducers/EmploymentStageReducers/comments/SecondStageCommentVisibilitySlice'
import thirdStageCommentVisibilitySlice from './reducers/EmploymentStageReducers/comments/ThirdStageCommentVisibilitySlice'
import forthStageCommentVisibilitySlice from './reducers/EmploymentStageReducers/comments/ForthStageCommentVisibilitySlice'
import fifthStageCommentVisibilitySlice from './reducers/EmploymentStageReducers/comments/FifthStageCommentVisibilitySlice'

export const store = configureStore({
	reducer: {
		notification: notificationSlice,
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
		chatId: chatIdSlice,
		currentResponce: CurrentResponceSlice,
		currentInterviewFormat: CurrentInterviewFormatSlice,
		currentInterviewTime: CurrentInterviewTimeSlice,
		chatResponceStatus: ChatRespondStatusSlice,
		currentRequest: CurrentRequestSlice,
		respondId: CurrentRespondIdSlice,
		StaffStepFormBusinessTrip: StaffStepFormBusinessTrip,
		StaffItemTabs: StaffItemTabsReducer,
		SecretaryStepFormBusinessTrip: SecretaryStepFormBusinessTrip,
		SecretaryItemTabs: SecretaryItemTabsReducer,
		[practiceApi.reducerPath]: practiceApi.reducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		currentVacancyId: CurrentVacancyIdSlice,
		currentInterviewTimeFormated: CurrentInterviewTimeFormatedSlice,
		currentEmploymentStage: CurrentEmploymentStage,
		employmentData: EmploymentDataSlice,
		employmentProgress: EmploymentProgressSlice,
		employmentSeekerDocs: EmploymentSeekerDocsSlice,
		inviteSeekerButtonStatus: inviteSeekerButtonReducer,
		employmentSeeker: currentEmploymentSeekerReducer,
		requisiteSeeker: currentRequisiteSeekerReducer,
		currentCommentVisibility: currentCommentVisibilitySlice,
		secondStageStatus: secondStageStatusSlice,
		thirdStageStatus: thirdStageStatusSlice,
		forthStageStatus: forthStageStatusSlice,
		fifthStageStatus: fifthStageStatusSlice,
		secondStageCommentVisibility: secondStageCommentVisibilitySlice,
		thirdStageCommentVisibility: thirdStageCommentVisibilitySlice,
		forthStageCommentVisibility: forthStageCommentVisibilitySlice,
		fifthStageCommentVisibility: fifthStageCommentVisibilitySlice,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			//.concat(...(process.env.NODE_ENV !== 'production' ? [logger] : []))
			.concat(apiSlice.middleware, practiceApi.middleware),
	devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector