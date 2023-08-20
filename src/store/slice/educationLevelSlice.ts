import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import endpoints from '../../api/endpoints'

import { IEducationLevelRequest } from './../../api/types'

export const educationLevelAPi = createApi({
	reducerPath: 'educationLevelAPi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.63.96:8080/api' }),
	endpoints: build => ({
		getEducationLevel: build.query<IEducationLevelRequest[], string>({
			query: language => ({
				url: endpoints.USER.EDUCATION_LEVEL,
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'Accept-Language': language
				}
			})
		})
	})
})

export const { useGetEducationLevelQuery } = educationLevelAPi
