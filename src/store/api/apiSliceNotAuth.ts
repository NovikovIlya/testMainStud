
import { RootState } from '..'
import {
	BaseQueryApi,
	FetchArgs,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import i18next from 'i18next'
import { logOut, setCredentials } from '../reducers/authSlice'
const baseQuery = fetchBaseQuery({
	baseUrl: 'https://newlk.kpfu.ru/',

})
const baseQueryWithReAuth = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: {}) => {
	let result = await baseQuery(args, api, extraOptions)
	if (result?.error?.status === 403 || result?.error?.status === 401) {
		
		const refreshToken =  localStorage.getItem('refresh')?.replaceAll('"', '');
		const refreshResult = await fetch('https://newlk.kpfu.ru/user-api/token/refresh', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  'Accept-Language': i18next.language
			},
			body: JSON.stringify({ refreshToken })
		  });
		  const refreshResultJson = await refreshResult.json()
		  if (refreshResultJson.accessToken) {
			console.log('---------------2')
			//@ts-ignore
			const user = api.getState().auth.user
			//@ts-ignore
			api.dispatch(setCredentials({ ...refreshResultJson, user }))
			result = await baseQuery(args, api, extraOptions)
		} else {
			console.log('refreshResultJsonВЫХОД--------------',refreshResultJson)
			api.dispatch(logOut())
		}
	}
	return result
}
export const apiSliceNotAuth = createApi({
	baseQuery: baseQueryWithReAuth,
	endpoints: () => ({}),
	tagTypes: ['Tasks', 'Contracts', 'Practice','Schedule','Submissions','Application','Order','MyPractice','practiceTeacher','emails','phones','Education','role'],
})
