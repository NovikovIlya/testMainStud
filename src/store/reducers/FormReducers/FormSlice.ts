import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const roleApi = createApi({
	reducerPath: 'roleApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.63.96:8080/api' }),
	endpoints: builder => ({
		putRole: builder.mutation({
			query: payload => ({
				url: '/users/me/details',
				method: 'PUT',
				body: payload,
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
		})
	})
})

export const { usePutRoleMutation } = roleApi
