import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'

import { abiturientApi } from './api/abiturent/abitRedirect'
import { apiSlice } from './api/apiSlice'
import { apiSliceStudent } from './api/apiSliceStudent'
import { apiSliceTeacher } from './api/apiSliceTeacher'
import { emptyApiSlice } from './api/emptyApiSlice'
import { practiceApi } from './api/practiceApi/practiceApi'
import { testApiSlice } from './api/testApiSlice'
import CatalogFilterSlice from './reducers/CatalogFilterSlice'
import ChatFilterSlice from './reducers/ChatFilterSlice'
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
import currentEmploymentSeekerReducer from './reducers/EmploymentStageReducers/EmploymentStageSeekerReducer'
import fifthStageCommentVisibilitySlice from './reducers/EmploymentStageReducers/comments/FifthStageCommentVisibilitySlice'
import forthStageCommentVisibilitySlice from './reducers/EmploymentStageReducers/comments/ForthStageCommentVisibilitySlice'
import secondStageCommentVisibilitySlice from './reducers/EmploymentStageReducers/comments/SecondStageCommentVisibilitySlice'
import sixStageCommentVisibilitySlice from './reducers/EmploymentStageReducers/comments/SixStageCommentVisibilitySlice'
import thirdStageCommentVisibilitySlice from './reducers/EmploymentStageReducers/comments/ThirdStageCommentVisibilitySlice'
import fifthStageStatusSlice from './reducers/EmploymentStageReducers/stages/FifthStageStatusSlice'
import forthStageStatusSlice from './reducers/EmploymentStageReducers/stages/ForthStageStatusSlice'
import secondStageStatusSlice from './reducers/EmploymentStageReducers/stages/SecondStageStatusSlice'
import sixStageStatusPersonnelSlice from './reducers/EmploymentStageReducers/stages/SixStageStatusPersonnelSlice'
import sixStageStatusSlice from './reducers/EmploymentStageReducers/stages/SixStageStatusSlice'
import thirdStageStatusSlice from './reducers/EmploymentStageReducers/stages/ThirdStageStatusSlice'
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
import currentRequisiteSeekerReducer from './reducers/RequisiteReducers/RequisiteSeekerReducer'
import currentCommentVisibilitySlice from './reducers/RequisiteReducers/StageCommentReducer'
import AboutMeReducer from './reducers/SeekerFormReducers/AboutMeReducer'
import ExperienceFileReducer from './reducers/SeekerFormReducers/ExperienceFileReducer'
import ExperienceReducer from './reducers/SeekerFormReducers/ExperienceReducer'
import FormCompletionReducer from './reducers/SeekerFormReducers/FormCompletionReducer'
import RespondEducationReducer from './reducers/SeekerFormReducers/RespondEducationReducer'
import ResponseDataSetReducer from './reducers/SeekerFormReducers/ResponseDataSetReducer'
import SkillsReducer from './reducers/SeekerFormReducers/SkillsReducer'
import authSlice from './reducers/authSlice'
import chatIdSlice from './reducers/chatIdSlice'
import forTeacherSlice from './reducers/forTeacherSlice'
import inviteSeekerButtonReducer from './reducers/inviteSeekerButtonReducer'
import notificationSlice from './reducers/notificationSlice'

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
		forTeacher: forTeacherSlice,
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
		sixStageStatus: sixStageStatusSlice,
		sixStageStatusPersonnel: sixStageStatusPersonnelSlice,
		secondStageCommentVisibility: secondStageCommentVisibilitySlice,
		thirdStageCommentVisibility: thirdStageCommentVisibilitySlice,
		forthStageCommentVisibility: forthStageCommentVisibilitySlice,
		fifthStageCommentVisibility: fifthStageCommentVisibilitySlice,
		sixStageCommentVisibility: sixStageCommentVisibilitySlice,
		catalogFilter: CatalogFilterSlice,
		[testApiSlice.reducerPath]: testApiSlice.reducer,
		[abiturientApi.reducerPath]: abiturientApi.reducer,
		[apiSliceStudent.reducerPath]: apiSliceStudent.reducer,
		[apiSliceTeacher.reducerPath]: apiSliceTeacher.reducer,
		[emptyApiSlice.reducerPath]: emptyApiSlice.reducer,
		experienceFile: ExperienceFileReducer,
		chatFilter: ChatFilterSlice,
		respondDataSet: ResponseDataSetReducer
	},
	//@ts-ignore
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({serializableCheck: false,})
			//.concat(...(process.env.NODE_ENV !== 'production' ? [logger] : []))
			.concat(apiSlice.middleware, practiceApi.middleware)
			.concat(abiturientApi.middleware)
			.concat(apiSliceStudent.middleware)
			.concat(apiSliceTeacher.middleware)
			.concat(testApiSlice.middleware)
			.concat(emptyApiSlice.middleware),
	devTools: true
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
