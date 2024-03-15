import {
	IContractInfo,
	IContractInfoFull,
	IContractsResponse,
	ICreateContract,
	ICreateContractFull,
	IDocument,
	IDocumentInfo,
	IDocumentStatus,
	IPracticeInfo,
	IPracticeInfoFull,
	IPracticesResponse,
	ITask,
	ITaskFull,
	ITasksResponse,
	TypeGetPractices,
	TypeGetTasks
} from '../type'

import { practiceApi } from './practiceApi'

export const taskService = practiceApi.injectEndpoints({
	endpoints: builder => ({
		getTasks: builder.query<ITasksResponse, TypeGetTasks>({
			query: param => ({
				url: `tasks`,
				params: { page: param.page, size: param.size, sort: [param.sort] }
			}),
			providesTags: result =>
				result
					? [
							...result.content.map(({ id }) => ({
								type: 'Tasks' as const,
								id
							})),
							{ type: 'Tasks', id: 'LIST' }
					  ]
					: [{ type: 'Tasks', id: 'LIST' }]
		}),
		getTask: builder.query<ITaskFull, string>({
			query: id => `tasks/${id}`
		}),
		deleteTask: builder.mutation<any, string>({
			query: id => {
				return {
					url: `tasks/${id}`,
					method: 'DELETE'
				}
			},
			invalidatesTags: [{ type: 'Tasks', id: 'LIST' }]
		}),
		createTask: builder.mutation<void, ITask>({
			query: body => {
				return {
					url: 'tasks',
					body: body,
					method: 'POST'
				}
			},
			invalidatesTags: [{ type: 'Tasks', id: 'LIST' }]
		}),
		changeTask: builder.mutation<void, ITaskFull>({
			query: body => {
				return {
					url: 'tasks',
					body: body,
					method: 'PUT'
				}
			},
			invalidatesTags: [{ type: 'Tasks', id: 'LIST' }]
		}),
		getPractices: builder.query<IPracticesResponse, TypeGetPractices>({
			query: param => ({
				url: `practices`,
				params: { page: param.page, size: param.size, sort: param.sort }
			}),
			providesTags: result =>
				result
					? [
							...result.content.map(({ id }) => ({
								type: 'Practice' as const,
								id
							})),
							{ type: 'Practice', id: 'LIST' }
					  ]
					: [{ type: 'Practice', id: 'LIST' }]
		}),
		getPractice: builder.query<IPracticeInfoFull, string>({
			query: id => `practices/${id}`
		}),
		createPractice: builder.mutation<void, IPracticeInfo>({
			query: body => {
				return {
					url: 'practices',
					body: body,
					method: 'POST'
				}
			},
			invalidatesTags: [{ type: 'Practice', id: 'LIST' }]
		}),
		changePractice: builder.mutation<void, IPracticeInfoFull>({
			query: body => {
				return {
					url: 'practices',
					body: body,
					method: 'PATCH'
				}
			},
			invalidatesTags: [{ type: 'Practice', id: 'LIST' }]
		}),
		deletePractice: builder.mutation<void, string>({
			query: id => {
				return {
					url: `practices/${id}`,
					method: 'DELETE'
				}
			},
			invalidatesTags: [{ type: 'Practice', id: 'LIST' }]
		}),
		getContracts: builder.query<IContractsResponse, TypeGetTasks>({
			query: param => ({
				url: `contracts`,
				params: { param }
			}),
			providesTags: result =>
				result
					? [
							...result.content.map(({ id }) => ({
								type: 'Contracts' as const,
								id
							})),
							{ type: 'Contracts', id: 'LIST' }
					  ]
					: [{ type: 'Contracts', id: 'LIST' }]
		}),
		getContract: builder.query<IContractInfoFull, string>({
			query: id => `contracts/${id}`
		}),
		deleteContract: builder.mutation<void, string>({
			query: id => {
				return {
					url: `contracts/${id}`,
					method: 'DELETE'
				}
			},
			invalidatesTags: [{ type: 'Contracts', id: 'LIST' }]
		}),
		changeContract: builder.mutation<void, ICreateContractFull>({
			query: body => {
				return {
					url: 'contracts',
					body: body,
					method: 'PATCH'
				}
			},
			invalidatesTags: [{ type: 'Contracts', id: 'LIST' }]
		}),
		createContract: builder.mutation<void, FormData>({
			query: (body: FormData) => {
				return {
					url: 'contracts',
					body: body,
					method: 'POST'
				}
			},
			invalidatesTags: [{ type: 'Contracts', id: 'LIST' }]
		}),
		createDocument: builder.mutation<IDocumentStatus, IDocument>({
			query: body => {
				return {
					url: '/document',
					body: body,
					method: 'POST'
				}
			}
		}),
		createPracticScedule: builder.mutation<void, IDocumentInfo>({
			query: body => {
				return {
					url: '/practice/schedule',
					body: body,
					method: 'POST'
				}
			}
		})
	})
})
export const {
	useGetTasksQuery,
	useGetTaskQuery,
	useLazyGetTaskQuery,
	useDeleteTaskMutation,
	useCreateTaskMutation,
	useChangeTaskMutation,
	useChangePracticeMutation,
	useCreatePracticeMutation,
	useDeletePracticeMutation,
	useGetPracticeQuery,
	useGetPracticesQuery,
	useChangeContractMutation,
	useCreateContractMutation,
	useDeleteContractMutation,
	useGetContractQuery,
	useGetContractsQuery,
	useCreateDocumentMutation,
	useCreatePracticSceduleMutation
} = taskService
