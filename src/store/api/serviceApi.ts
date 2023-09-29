import { Exam, ICalendar, TypeSchedule } from '../type'

import { apiSlice } from './apiSlice'

export const serviceApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getSchedule: builder.query<TypeSchedule, void>({
			query: () => `schedule-api/schedule`
		}),
		getExamsSchedule: builder.query<Exam[], void>({
			query: () => '/study-plan-api/studyplan/examsSchedule'
		}),
		getStudyPlan: builder.query<ICalendar, void>({
			query: () => '/study-plan-api/studyplan'
		})
	})
})
export const {
	useGetScheduleQuery,
	useGetExamsScheduleQuery,
	useGetStudyPlanQuery
} = serviceApi
