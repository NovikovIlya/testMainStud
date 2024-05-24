import { RootState } from '..'
import {
	BaseQueryApi,
	FetchArgs,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import i18next from 'i18next'

import { logOut, setCredentials } from '../reducers/authSlice'

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://newlk.kpfu.ru/',
	prepareHeaders(headers, { getState }) {
		const token = (getState() as RootState).auth.accessToken

		if (token) {
			headers.set('authorization', `Bearer ${token.replaceAll('"', '')}`)
		}
		headers.set('Accept-Language', i18next.language)
		return headers
	}
})

const baseQueryWithReAuth = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: {}
) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result?.error?.status === 403 || result?.error?.status === 401) {
		console.log('sending refresh token')
		const refreshResult = await baseQuery(
			{
				url: 'user-api/token/refresh',
				body: {
					refreshToken: localStorage.getItem('refresh')?.replaceAll('"', '')
				},
				method: 'POST'
			},
			api,
			extraOptions
		)
		if (refreshResult.data) {
			//@ts-ignore
			const user = api.getState().auth.user
			//@ts-ignore
			api.dispatch(setCredentials({ ...refreshResult.data, user }))
			result = await baseQuery(args, api, extraOptions)
		} else {
			api.dispatch(logOut())
		}
	}
	return result
}

export const apiSlice = createApi({
	baseQuery: baseQueryWithReAuth,
	endpoints: () => ({}),
	tagTypes: ['Tasks', 'Contracts', 'Practice'],
})
