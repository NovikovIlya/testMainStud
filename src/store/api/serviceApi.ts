import { Exam, ICalendar, TypeSchedule } from '../type'

import { apiSlice } from './apiSlice'

export const serviceApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		examsSchedule: builder.query<Exam[], void>({
			query: () => `calendar/examsSchedule`
		}),
		calendar: builder.query<ICalendar[], void>({
			query: () => `calendar/studyplan`
		}),
		getSchedule: builder.query<TypeSchedule, void>({
			query: () => `schedule-api/schedule`
		})
	})
})
export const { useCalendarQuery, useExamsScheduleQuery, useGetScheduleQuery } =
	serviceApi
