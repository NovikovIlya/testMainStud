import {
	IAddress,
	IDocument,
	IEducationState,
	IWorkState,
	formItem
} from '../../api/types'
import { IDocumentsRequest } from '../reducers/type'

import { apiSlice } from './apiSlice'

export const formApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getMyDocuments: build.query<IDocument, void>({
			query: () => ({
				url: 'user-api/users/me/document'
			}),
			keepUnusedDataFor:1,

		}),
		getAllDocuments: build.query<IDocumentsRequest[], void>({
			query: () => ({
				url: 'user-api/document'
			}),
			keepUnusedDataFor:1,
		}),
		getInfoUser: build.query<formItem, void>({
			query: () => ({
				url: 'user-api/users/me'
			}),
			keepUnusedDataFor:1,
		}),
		getAddress: build.query<IAddress, void>({
			query: () => ({
				url: 'user-api/users/me/address'
			}),
			keepUnusedDataFor:1,
		}),
		getEducation: build.query<IEducationState[], void>({
			query: () => ({
				url: 'user-api/users/me/education'
			}),
			keepUnusedDataFor:1,
			providesTags: ['Education']

		}),
		postEducation: build.mutation<any, any>({
			query: (body) => ({
				url: 'user-api/users/me/education',
				body,
				method: 'POST'
			})
		}),
		putEducation: build.mutation<any, any>({
			query: (body) => ({
				url: 'user-api/users/me/education',
				body,
				method: 'PUT'
			}),
			invalidatesTags: ['Education']
			
		}),
		getParents: build.query<any, void>({
			query: () => ({
				url: 'user-api/users/me/parent'
			}),
			keepUnusedDataFor:1,
		}),
		postParents: build.mutation<any, any>({
			query: (body) => ({
				url: 'user-api/users/me/parent',
				body,
				method: 'POST'
			}),
		
		}),
		getWorks: build.query<IWorkState, void>({
			query: () => ({
				url: 'users/me/work-history/items'
			}),
			keepUnusedDataFor:1,
		}),
		getWork: build.query<IWorkState, void>({
			query: () => ({
				url: 'users/me/work-history'
			}),
			keepUnusedDataFor:1,
		}),
		postInfoUser: build.mutation({
			query: (body: formItem) => {
				return {
					url: 'user-api/users/me',
					body: body,
					method: 'POST'
				}
			},
			
		}),
		postDocument: build.mutation({
			query: body => {
				return {
					url: 'user-api/users/me/document',
					body: body,
					method: 'POST'
				}
			}
		}),
		postAddress: build.mutation({
			query: body => {
				return {
					url: 'user-api/users/me/address',
					body: body,
					method: 'PUT'
				}
			}
		})

	})
})

export const {
	useGetMyDocumentsQuery,
	useGetInfoUserQuery,
	useGetAddressQuery,
	useGetEducationQuery,
	useGetParentsQuery,
	useGetWorksQuery,
	useGetWorkQuery,
	usePostInfoUserMutation,
	usePostDocumentMutation,
	useGetAllDocumentsQuery,
	usePostAddressMutation,
	usePostEducationMutation,
	usePutEducationMutation,
	usePostParentsMutation
} = formApi
