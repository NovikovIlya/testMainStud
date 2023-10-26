import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: credentials => {
				return {
					url: 'user-api/login',
					method: 'POST',
					body: { ...credentials }
				}
			}
		}),
		register: builder.mutation({
			query: credentials => {
				return {
					url: 'user-api/register',
					method: 'POST',
					body: { ...credentials }
				}
			}
		})
	})
})

export const { useLoginMutation, useRegisterMutation } = authApiSlice
