import { IApproveRequest } from '../../api/types'
import {
	CategoryType,
	ChatMessageType,
	Documentation,
	Email,
	Exam,
	ICalendar,
	ResponceType,
	RespondItemType,
	Template,
	TypeSchedule,
	VacancyGroupedResponcesType,
	VacancyItemType,
	VacancyRequestItemType,
	VacancyRequestType,
	VacancyRequestViewType,
	VacancyRespondItemType,
	VacancyViewResponceType,
	respondStatus
} from '../type'

import { apiSlice } from './apiSlice'

//Крайне временное решение из-за того, что в КФУ всё ещё отсутствует роль даже соискателя, что уж говорить об учёте кадров,
//руководителе и т.д.
const seekerToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJQU1pdHJvZmFub3ZAc3R1ZC5rcGZ1LnJ1IiwiaWF0IjoxNzExNTc3OTMwLCJleHAiOjE3MTE1ODg3MzAsInNjb3BlIjoidXNlciIsInJvbGVzIjpbeyJ1c2VySWQiOiI2Iiwic2Vzc2lvbklkIjoiMjQwMzIyNzE0ODc1MTk0ODI5NzMzMDkwNDczNTM2NjciLCJzZXNzaW9uSGFzaCI6IkQyQTIyNUE3NDk5RjFDRTE2Q0JFMDJCOUY2QzkxN0UxIiwiZG9jdW1lbnRzSGFzaCI6IkIyNkNCMEMzRThBQzM2RDZBMENCNTEyQ0YzMDIzNzc3IiwibG9naW4iOiJJQU1pdHJvZmFub3YiLCJ0eXBlIjoiU0VFS0VSIn1dLCJzZXNzaW9uSWQiOiIyNDAzMjI3MTQ4NzUxOTQ4Mjk3MzMwOTA0NzM1MzY2NyIsInNlc3Npb25IYXNoIjoiRDJBMjI1QTc0OTlGMUNFMTZDQkUwMkI5RjZDOTE3RTEiLCJhbGxJZCI6IjE3ODQ0MCIsImVtYWlsIjoibWl0cm9fMDJAbWFpbC5ydSJ9.rbdEbs6b2NVFyFa65GW5rpy8VBd7TKpNxaTrVBMh5i0'
const personnelDeparmentToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTdWJCQXNhZHVsbG9ldkBzdHVkLmtwZnUucnUiLCJpYXQiOjE3MTE3MjQ1NDQsImV4cCI6MTcxMTczNTM0NCwic2NvcGUiOiJ1c2VyIiwicm9sZXMiOlt7InVzZXJJZCI6IjciLCJzZXNzaW9uSWQiOiIyNDA0NzM4MTc3NzI3MjIwMTMzMDkwNzU0ODQ2ODU5MSIsInNlc3Npb25IYXNoIjoiNTZEMTZENTNDOTc5MDk5MTk0QTY4OEY4Qjk0M0I0N0MiLCJkb2N1bWVudHNIYXNoIjoiQTdCMkI0MUU4MjQ4NDYzNkY2ODZDNTQ3NEY0NEREMjYiLCJsb2dpbiI6IlNCQXNhZHVsbG9ldiIsInR5cGUiOiJQRVJTT05ORUxfREVQQVJUTUVOVCJ9LHsidXNlcklkIjoiMzQ4NTQxIiwic2Vzc2lvbklkIjoiMjQwNDczODA1NjYxMjc2MDM3NTM5NjI3MjY1MTM0OTQiLCJzZXNzaW9uSGFzaCI6IkUzQUZFMTUzNUVCMTU3NEUyMkZCNUJDNEYxNUFERkUwIiwiZG9jdW1lbnRzSGFzaCI6IiIsImxvZ2luIjoiU3ViQkFzYWR1bGxvZXYiLCJ0eXBlIjoiRU1QTCJ9LHsidXNlcklkIjoiMzM2MDM3Iiwic2Vzc2lvbklkIjoiMjQwNDczODI0NDUwMjI3MTM5NzgzNzQ5OTMwNjk4MDciLCJzZXNzaW9uSGFzaCI6IjcxMEExMTFFM0FCN0Q4NDczNTVFOEM0QkUxMDI4RTZBIiwiZG9jdW1lbnRzSGFzaCI6IkEyMkE3NURCRTBBNzg4MDE4OTY4NjZCQjgzNUIxNDQxIiwibG9naW4iOiJTdUJBc2FkdWxsb2V2IiwidHlwZSI6IlNUVUQifV0sInNlc3Npb25JZCI6IjI0MDQ3MzgxNzc3MjcyMjAxMzMwOTA3NTQ4NDY4NTkxIiwic2Vzc2lvbkhhc2giOiI1NkQxNkQ1M0M5NzkwOTkxOTRBNjg4RjhCOTQzQjQ3QyIsImFsbElkIjoiMjM5MTc0IiwiZW1haWwiOiJCYXN1YmhvbmJla0BnbWFpbC5jb20ifQ.MMK47Gd4AKG8tPzmPAwgNq79zVEmfzdFCuoZjcXeW_o'
const supervisorToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJQU1pdHJvZmFub3ZAc3R1ZC5rcGZ1LnJ1IiwiaWF0IjoxNzExNTc3OTMwLCJleHAiOjE3MTE1ODg3MzAsInNjb3BlIjoidXNlciIsInJvbGVzIjpbeyJ1c2VySWQiOiI2Iiwic2Vzc2lvbklkIjoiMjQwMzIyNzE0ODc1MTk0ODI5NzMzMDkwNDczNTM2NjciLCJzZXNzaW9uSGFzaCI6IkQyQTIyNUE3NDk5RjFDRTE2Q0JFMDJCOUY2QzkxN0UxIiwiZG9jdW1lbnRzSGFzaCI6IkIyNkNCMEMzRThBQzM2RDZBMENCNTEyQ0YzMDIzNzc3IiwibG9naW4iOiJJQU1pdHJvZmFub3YiLCJ0eXBlIjoiU1VQRVJWSVNPUiJ9XSwic2Vzc2lvbklkIjoiMjQwMzIyNzE0ODc1MTk0ODI5NzMzMDkwNDczNTM2NjciLCJzZXNzaW9uSGFzaCI6IkQyQTIyNUE3NDk5RjFDRTE2Q0JFMDJCOUY2QzkxN0UxIiwiYWxsSWQiOiIxNzg0NDAiLCJlbWFpbCI6Im1pdHJvXzAyQG1haWwucnUifQ._3lXFX2cHYMmBafkOhWhxmbbKb912nMqyLjGqmvYl48'

export const serviceApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getSchedule: builder.query<TypeSchedule, void>({
			query: () => `schedule-api/schedule`
		}),
		getExamsSchedule: builder.query<Exam[], void>({
			query: () => 'study-plan-api/studyplan/examsSchedule'
		}),
		getStudyPlan: builder.query<ICalendar, void>({
			query: () => 'study-plan-api/studyplan'
		}),
		getEmail: builder.query<Email, void>({
			query: () => 'user-api/settings/emails'
		}),
		getTemplates: builder.query<Template[], void>({
			query: () => 'unified-center-api/templates'
		}),
		getPracticeDocuments: builder.query<Template[], void>({
			query: () => 'unified-center-api/practice-documents'
		}),
		getMyQWEDocuments: builder.query<Template[], void>({
			query: () => 'unified-center-api/my-documents'
		}),
		getDocumentation: builder.query<Documentation, void>({
			query: () => 'unified-center-api/documentation'
		}),
		getPhoneUser: builder.query<Array<any>, void>({
			query: () => 'user-api/settings/phones'
		}),
		getCategories: builder.query<CategoryType[], void>({
			query: () => ({ url: 'http://localhost:8082/employment-api/v1/category' })
		}),
		getDirections: builder.query<{ title: string }[], string>({
			query: category => ({
				url:
					'http://localhost:8082/employment-api/v1/direction?category=' +
					category
			})
		}),
		getSubdivisions: builder.query<{ title: string }[], string>({
			query: category => ({
				url:
					'http://localhost:8082/employment-api/v1/subdivision?category=' +
					category
			})
		}),
		getVacancyView: builder.query<VacancyViewResponceType, number>({
			query: id => ({
				url: 'http://localhost:8082/employment-api/v1/vacancy/' + id
			})
		}),
		getVacancyPreviewByDirection: builder.query<
			VacancyItemType[],
			{ category: string; direction: string; page: number }
		>({
			query: ({ category, direction, page }) => ({
				url:
					'http://localhost:8082/employment-api/v1/vacancy/direction?category=' +
					category +
					'&direction=' +
					direction +
					'&page=' +
					page
			})
		}),
		getVacancyPreviewBySubdivision: builder.query<
			VacancyItemType[],
			{ category: string; subdivision: string; page: number }
		>({
			query: ({ category, subdivision, page }) => ({
				url:
					'http://localhost:8082/employment-api/v1/vacancy/subdivisions?category=' +
					category +
					'&subdivisions=' +
					subdivision +
					'&page=' +
					page
			})
		}),
		getSeekerResponds: builder.query<RespondItemType[], string>({
			query: status => ({
				url:
					'http://localhost:8082/employment-api/v1/seeker/responds?status=' +
					status
			})
		}),
		getVacancyGroupedResponces: builder.query<
			VacancyGroupedResponcesType[],
			{ category: string; direction?: string; role: string }
		>({
			query: ({ category, direction, role }) => ({
				url: `http://localhost:8082/employment-api/v1/responds/grouped?category=${category}${
					direction !== undefined ? '&direction=' + direction : ''
				}`,
				headers: {
					Authorization: `Bearer ${
						role === 'PERSONNEL_DEPARTMENT'
							? personnelDeparmentToken
							: supervisorToken
					}`
				}
			})
		}),
		getResponcesByVacancy: builder.query<
			VacancyRespondItemType[],
			{ id: number; status: string; role: string }
		>({
			query: ({ id, status, role }) => ({
				url: `http://localhost:8082/employment-api/v1/vacancy/${id}/responds?status=${status}`,
				headers: {
					Authorization: `Bearer ${
						role === 'PERSONNEL_DEPARTMENT'
							? personnelDeparmentToken
							: supervisorToken
					}`
				},
				keepUnusedDataFor: 0
			})
		}),
		getRespondFullInfo: builder.query<VacancyRespondItemType, number>({
			query: id => ({
				url: `http://localhost:8082/employment-api/v1/respond/${id}`,
				headers: {
					Authorization: `Bearer ${personnelDeparmentToken}`
				}
			})
		}),
		getChatIdByRespondId: builder.query<number, number>({
			query: respId => ({
				url: `http://localhost:8082/employment-api/v1/respond/${respId}/chat`
			})
		}),
		getUnreadMessagesCount: builder.query<number, number>({
			query: chatId => ({
				url: `http://localhost:8082/employment-api/v1/chat/${chatId}/unread-count`,
				headers: {
					Authorization: `Bearer ${seekerToken}`
				}
			}),
			keepUnusedDataFor: 0
		}),
		getChatMessages: builder.query<
			ChatMessageType[],
			{ chatId: number; lastMessageId?: number; size?: number; role: string }
		>({
			query: ({ chatId, lastMessageId, size, role }) => ({
				url: `http://localhost:8082/employment-api/v1/chat/${chatId}/messages?${
					lastMessageId !== undefined ? `last_message_id=${lastMessageId}&` : ''
				}${size !== undefined ? `size=${size}&` : ''}`,
				headers: {
					Authorization: `Bearer ${
						role === 'PERSONNEL_DEPARTMENT'
							? personnelDeparmentToken
							: seekerToken
					}`
				}
			})
		}),
		getSupervisorVacancy: builder.query<VacancyItemType[], void>({
			query: () => ({
				url: `http://localhost:8082/employment-api/v1/management/supervisor/vacancy`,
				headers: {
					Authorization: `Bearer ${supervisorToken}`
				}
			})
		}),
		getVacancyRequests: builder.query<VacancyRequestItemType[], string>({
			query: action => ({
				url: `http://localhost:8082/employment-api/v1/management/vacancy-requests${
					action === 'все' ? '' : `?action=${action}`
				}`,
				headers: {
					Authorization: `Bearer ${personnelDeparmentToken}`
				},
				keepUnusedDataFor: 0
			})
		}),
		getVacancyRequestView: builder.query<VacancyRequestViewType, number>({
			query: id => ({
				url: `http://localhost:8082/employment-api/v1/management/vacancy-requests/${id}`,
				headers: {
					Authorization: `Bearer ${personnelDeparmentToken}`
				}
			})
		}),
		postPhone: builder.mutation({
			query: phone => {
				return {
					url: 'user-api/settings/phones',
					body: phone,
					method: 'POST'
				}
			}
		}),
		changePassword: builder.mutation({
			query: ({
				newPassword,
				oldPassword
			}: {
				oldPassword: string
				newPassword: string
			}) => {
				return {
					url: 'user-api/settings/password',
					body: {
						newPassword,
						oldPassword
					},
					method: 'PUT'
				}
			}
		}),
		approveEmail: builder.mutation({
			query: (hash: IApproveRequest) => {
				return {
					url: 'user-api/register/approve',
					body: hash,
					method: 'POST'
				}
			}
		}),
		postEmail: builder.mutation({
			query: email => {
				return {
					url: 'user-api/settings/emails',
					body: email,
					method: 'POST'
				}
			}
		}),
		deleteAcc: builder.mutation({
			query: id => {
				return {
					url: `user-api/settings/emails/${id}`,
					method: 'DELETE'
				}
			}
		}),
		verifyAcc: builder.mutation({
			query: id => {
				return {
					url: `user-api/settings/emails/${id}/send-verification`,
					method: 'POST'
				}
			}
		}),
		setRole: builder.mutation({
			query: (body: { role: string }) => {
				return {
					url: 'user-api/users/me/role',
					body: body,
					method: 'POST'
				}
			}
		}),
		postVacancyRespond: builder.mutation<void, { id: number } & ResponceType>({
			query: arg => ({
				url:
					'http://localhost:8082/employment-api/v1/vacancy/' +
					arg.id +
					'/respond',
				method: 'POST',
				body: arg,
				headers: {
					Authorization: `Bearer ${seekerToken}`
				}
			})
		}),
		deleteVacancyRespond: builder.mutation<void, number>({
			query: id => ({
				url: `http://localhost:8082/employment-api/v1/respond/${id}`,
				method: 'DELETE'
			})
		}),
		postChatMessage: builder.mutation<
			ChatMessageType,
			{ id: number; text: string; name: string; role: string }
		>({
			query: ({ id, text, name, role }) => ({
				url: `http://localhost:8082/employment-api/v1/chat/${id}/text`,
				method: 'POST',
				body: { text: text },
				headers: {
					Authorization: `Bearer ${
						role === 'PERSONNEL_DEPARTMENT'
							? personnelDeparmentToken
							: seekerToken
					}`,
					'X-User-Name': name
				}
			})
		}),
		readChatMessage: builder.mutation<
			void,
			{ chatId: number; messageId: number; sessionId: string; role: string }
		>({
			query: ({ chatId, messageId, sessionId, role }) => ({
				url: `http://localhost:8082/employment-api/v1/chat/${chatId}/message/${messageId}/read`,
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${
						role === 'PERSONNEL_DEPARTMENT'
							? personnelDeparmentToken
							: seekerToken
					}`,
					'X-User-Name': sessionId
				}
			})
		}),
		approveRespond: builder.mutation<VacancyRespondItemType, number>({
			query: respondId => ({
				url: `http://localhost:8082/employment-api/v1/respond/${respondId}/status/approve`,
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${personnelDeparmentToken}`
				}
			})
		}),
		inviteSeeker: builder.mutation<
			VacancyRespondItemType,
			{
				respondId: number
				format: 'OFFLINE' | 'ONLINE'
				mainTime: string
				reservedTime: string
				additionalInfo?: string
			}
		>({
			query: ({
				respondId,
				format,
				mainTime,
				reservedTime,
				additionalInfo
			}) => ({
				url: `http://localhost:8082/employment-api/v1/respond/${respondId}/status/invite`,
				method: 'PUT',
				body: {
					format: format,
					mainTime: mainTime,
					reserveTime: reservedTime,
					additionalInfo: additionalInfo
				},
				headers: {
					Authorization: `Bearer ${supervisorToken}`
				}
			})
		}),
		requestDeleteVacancy: builder.mutation<void, number>({
			query: id => ({
				url: `http://localhost:8082/employment-api/v1/management/vacancy-requests/for-delete`,
				method: 'POST',
				body: { vacancyId: id },
				headers: {
					Authorization: `Bearer ${supervisorToken}`
				}
			})
		}),
		requestCreateVacancy: builder.mutation<void, VacancyRequestType>({
			query: arg => ({
				url: `http://localhost:8082/employment-api/v1/management/vacancy-requests/for-create`,
				method: 'POST',
				body: arg,
				headers: {
					Authorization: `Bearer ${supervisorToken}`
				}
			})
		}),
		requestUpdateVacancy: builder.mutation<
			void,
			VacancyRequestType & { vacancyId: number }
		>({
			query: arg => ({
				url: `http://localhost:8082/employment-api/v1/management/vacancy-requests/for-update`,
				method: 'POST',
				body: arg,
				headers: {
					Authorization: `Bearer ${supervisorToken}`
				}
			})
		}),
		acceptVacancyRequest: builder.mutation<void, number>({
			query: id => ({
				url: `http://localhost:8082/employment-api/v1/management/vacancy-requests/${id}/accept`,
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${personnelDeparmentToken}`
				}
			})
		}),
		denyVacancyRequest: builder.mutation<void, number>({
			query: id => ({
				url: `http://localhost:8082/employment-api/v1/management/vacancy-requests/${id}/deny`,
				method: 'POST',
				headers: {
					Authorization: `Bearer ${personnelDeparmentToken}`
				}
			})
		}),
		alterCreateVacancyRequest: builder.mutation<
			void,
			VacancyRequestType & { vacancyRequestId: number }
		>({
			query: body => ({
				url: `http://localhost:8082/employment-api/v1/management/vacancy-requests/for-create`,
				method: 'PATCH',
				body: body,
				headers: {
					Authorization: `Bearer ${personnelDeparmentToken}`
				}
			})
		})
	})
})
export const {
	useVerifyAccMutation,
	useGetEmailQuery,
	useGetScheduleQuery,
	useGetExamsScheduleQuery,
	useGetStudyPlanQuery,
	useApproveEmailMutation,
	useSetRoleMutation,
	usePostEmailMutation,
	useChangePasswordMutation,
	useGetPhoneUserQuery,
	usePostPhoneMutation,
	useGetCategoriesQuery,
	useGetDirectionsQuery,
	useGetSubdivisionsQuery,
	usePostVacancyRespondMutation,
	useLazyGetVacancyViewQuery,
	useGetVacancyPreviewByDirectionQuery,
	useGetVacancyPreviewBySubdivisionQuery,
	useGetSeekerRespondsQuery,
	useGetVacancyGroupedResponcesQuery,
	useGetResponcesByVacancyQuery,
	useDeleteVacancyRespondMutation,
	useGetChatIdByRespondIdQuery,
	useGetUnreadMessagesCountQuery,
	useLazyGetChatMessagesQuery,
	usePostChatMessageMutation,
	useReadChatMessageMutation,
	useLazyGetResponcesByVacancyQuery,
	useLazyGetRespondFullInfoQuery,
	useGetRespondFullInfoQuery,
	useLazyGetVacancyGroupedResponcesQuery,
	useApproveRespondMutation,
	useInviteSeekerMutation,
	useGetSupervisorVacancyQuery,
	useRequestDeleteVacancyMutation,
	useRequestCreateVacancyMutation,
	useRequestUpdateVacancyMutation,
	useGetVacancyRequestsQuery,
	useGetVacancyRequestViewQuery,
	useLazyGetVacancyRequestViewQuery,
	useAcceptVacancyRequestMutation,
	useDenyVacancyRequestMutation,
	useAlterCreateVacancyRequestMutation
} = serviceApi
