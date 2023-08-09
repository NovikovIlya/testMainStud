import { RootState } from '..'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Day {
	name: string
	time: string
	teacher: string
	teacherId: number
	building: string
	room: string
	type: string
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
	baseUrl: 'http://192.168.63.96:8085/api/schedule',
	prepareHeaders: (headers, { getState }) => {
		const token = getState() as RootState //?.AuthReg?.authData?.accessToken
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
			query: () => ``
		})
	})
})

export const { useGetScheduleQuery } = scheduleApi
