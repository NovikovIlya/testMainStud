import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type TypeApprove = {
	id: string | null
	hash: string | null
}
export const approveApi = createApi({
	reducerPath: 'approveApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8080/api/'
	}),
	endpoints: builder => ({
		approveEmail: builder.mutation<any, TypeApprove>({
			query: body => ({
				method: 'POST',
				url: `register/approve`,
				body
			})
		})
	})
})

export const { useApproveEmailMutation } = approveApi
