import { RootState } from '..'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ICalendar {
	semester: number
	type_id: number
	type_name: string
	gost_hours: number
	laboratory_hours: number
	total_laboratory_hours: number
	lecture_hours: number
	total_lecture_hours: number
	practice_hours: number
	total_practice_hours: number
	seminar_hours: number
	total_seminar_hours: number
	independent_hours: number
	total_independent_hours: number
	is_exam: boolean
	is_quiz: boolean
	subject_id: number
	subject_name: string
	full_shifr: string
}

interface Day {
	name: string
	time: string
	teacher: string
	teacherId: number
	building: string
	room: string
	type: string
}
interface Exam {
	building_name: string
	room_num: string
	name: string
	employee_id: number
	employee_name: string
	date_note: string
	time_note: string
}
type TypeSchedule = {
	monday: Day[]
	tuesday: Day[]
	wednesday: Day[]
	thursday: Day[]
	friday: Day[]
	saturday: Day[]
}
const baseQuery = fetchBaseQuery({
	baseUrl: 'http://192.168.63.96:8083/api/',
	prepareHeaders: (headers, { getState }) => {
		const accessToken = localStorage.getItem('access')
		console.log(accessToken)

		if (accessToken) {
			headers.set('Authorization', `Bearer ${accessToken}`)
			headers.set('Content-Type', 'application/json')
		}

		return headers
	}
})
export const scheduleApi = createApi({
	reducerPath: 'scheduleApi',
	baseQuery,
	endpoints: builder => ({
		getSchedule: builder.query<TypeSchedule, void>({
			query: () => `schedule`
		}),
		examsSchedule: builder.query<Exam[], void>({
			query: () => `calendar/examsSchedule`
		}),
		calendar: builder.query<ICalendar[], void>({
			query: () => `calendar/studyplan`
		})
	})
})

export const { useGetScheduleQuery, useExamsScheduleQuery, useCalendarQuery } =
	scheduleApi
