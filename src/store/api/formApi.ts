import { IAddress, IDocument, IEducationState, formItem } from '../../api/types'
import { IDocumentsRequest } from '../type'

import { apiSlice } from './apiSlice'

export const formApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getMyDocuments: build.query<IDocument, string>({
			query: language => ({
				url: 'user-api/users/me/document',
				headers: {
					'Accept-Language': language
				}
			})
		}),
		getDocuments: build.query<IDocumentsRequest[], string>({
			query: language => ({
				url: 'user-api/document',
				headers: {
					'Accept-Language': language
				}
			})
		}),
		getInfoUser: build.query<formItem, void>({
			query: () => ({
				url: '/user-api/users/me'
			})
		}),
		getAddress: build.query<IAddress, void>({
			query: () => ({
				url: '/user-api/users/me/address'
			})
		}),
		getEducation: build.query<IEducationState[], void>({
			query: () => ({
				url: '/user-api/users/me/education'
			})
		}),
		getParents: build.query<any, void>({
			query: () => ({
				url: '/user-api/users/me/parent'
			})
		})
	})
})

export const {
	useGetMyDocumentsQuery,
	useGetInfoUserQuery,
	useGetDocumentsQuery,
	useGetAddressQuery,
	useGetEducationQuery,
	useGetParentsQuery
} = formApi
