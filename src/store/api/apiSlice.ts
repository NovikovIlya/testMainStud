import { RootState } from '..'
import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import i18next from 'i18next'

import { logOut, setCredentials } from '../reducers/authSlice'

const baseQuery = fetchBaseQuery({
	  baseUrl: 'https://newlk-test.kpfu.ru/',
	 //  baseUrl: 'https://newlk.kpfu.ru/',
	prepareHeaders(headers, { getState }) {
		const token = (getState() as RootState).auth.accessToken
		if (token) {
			headers.set('authorization', `Bearer ${token.replaceAll('"', '')}`)
		}
		headers.set('Accept-Language', i18next.language)
		return headers
	}
})
const baseQueryWithReAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result?.error?.status === 500 || result?.error?.status === 501) {
		// @ts-ignore
		const errorMessage = result.error.data?.errors?.[0]?.message // Извлекаем сообщение об ошибке
		if (errorMessage === 'Истекло время или неверное значение session Id. Перезайдите на сайт.') {
			alert('Время сессии истекло. Пожалуйста, пройдите процедуру авторизации заново.')
			api.dispatch(logOut())
		}
	}

	if (result?.error?.status === 403 || result?.error?.status === 401) {
		const refreshToken = localStorage.getItem('refresh')?.replaceAll('"', '')
		const refreshResult = await fetch('https://newlk.kpfu.ru/user-api/token/refresh', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept-Language': i18next.language
			},
			body: JSON.stringify({ refreshToken })
		})
		const refreshResultJson = await refreshResult.json()
		if (refreshResultJson.accessToken) {
			console.log('-------------2')
			//@ts-ignore
			const user = api.getState().auth.user
			//@ts-ignore
			api.dispatch(setCredentials({ ...refreshResultJson, user }))
			result = await baseQuery(args, api, extraOptions)
		} else {
			console.log('refreshResultJsonВЫХОД--------------', refreshResultJson)
			api.dispatch(logOut())
		}
	}
	return result
}

// const baseQueryWithRetry = retry(baseQueryWithReAuth, {
//     maxRetries: 3, // Максимальное количество попыток
// 	// @ts-ignore
//     retryCondition: (error) => {
//         // Повторная отправка только в случае ошибки 500
//         return error.status === 500;
//     },
// });

export const apiSlice = createApi({
	baseQuery: baseQueryWithReAuth,
	endpoints: () => ({}),
	tagTypes: [
		'Tasks',
		'Contracts',
		'Practice',
		'Schedule',
		'Submissions',
		'Application',
		'Order',
		'MyPractice',
		'practiceTeacher',
		'emails',
		'phones',
		'Education',
		'role',
		'Messages',
		'forTeacherScedule',
		'forTeacherSceduleBrs',
		'forTeacherSceduleVedomost',
		'forTeacherJournalDay',
		'forTeacherJournalSemester',
		'Avatar',
		'AboutMe',
		'nativeLanguages',
		'foreignLanguages',
		'Сheckboxes',
		'levelsLanguages',
		'certificateLanguages',
		'socialActivity'
	]
})
