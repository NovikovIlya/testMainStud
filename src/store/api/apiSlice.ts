import { RootState } from '..'
import {
	BaseQueryApi,
	FetchArgs,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'

import { logOut, setCredentials } from '../reducers/authSlice'

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://newlk.kpfu.ru/',

	prepareHeaders(headers, { getState }) {
		const token = (getState() as RootState).auth.accessToken

		if (token) {
			headers.set('authorization', `Bearer ${token.replaceAll('"', '')}`)
		}
		return headers
	}
})

const baseQueryWithReAuth = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: {}
) => {
	let result = await baseQuery(args, api, extraOptions)
	console.log(result)

	if (result?.error?.status === 403) {
		console.log('sending refresh token')
		const refreshResult = await baseQuery('user-api/refresh', api, extraOptions)
		console.log(refreshResult)
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
	endpoints: builder => ({})
})
