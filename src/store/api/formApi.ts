import {
	IAddress,
	IDocument,
	IEducationState,
	IWorkState,
	formItem
} from '../../api/types'
import { IDocumentsRequest } from '../type'

import { apiSlice } from './apiSlice'

export const formApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getMyDocuments: build.query<IDocument, void>({
			query: () => ({
				url: 'user-api/users/me/document'
			})
		}),
		getAllDocuments: build.query<IDocumentsRequest[], void>({
			query: () => ({
				url: 'user-api/document'
			})
		}),
		getInfoUser: build.query<formItem, void>({
			query: () => ({
				url: 'user-api/users/me'
			})
		}),
		getAddress: build.query<IAddress, void>({
			query: () => ({
				url: 'user-api/users/me/address'
			})
		}),
		getEducation: build.query<IEducationState[], void>({
			query: () => ({
				url: 'user-api/users/me/education'
			})
		}),
		getParents: build.query<any, void>({
			query: () => ({
				url: 'user-api/users/me/parent'
			})
		}),
		getWorks: build.query<IWorkState, void>({
			query: () => ({
				url: 'users/me/work-history/items'
			})
		}),
		getWork: build.query<IWorkState, void>({
			query: () => ({
				url: 'users/me/work-history'
			})
		}),
		postInfoUser: build.mutation({
			query: (body: formItem) => {
				return {
					url: 'user-api/users/me',
					body: body,
					method: 'POST'
				}
			}
		}),
		postDocument: build.mutation({
			query: body => {
				return {
					url: 'user-api/users/me/document',
					body: body,
					method: 'POST'
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
	useGetAllDocumentsQuery
} = formApi
