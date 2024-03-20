import { IApproveRequest } from '../../api/types'
import {
	CategoryType,
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
	VacancyRespondItemType,
	VacancyViewResponceType,
	respondStatus
} from '../type'

import { apiSlice } from './apiSlice'

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
			{ category: string; direction?: string }
		>({
			query: ({ category, direction }) => ({
				url: `http://localhost:8082/employment-api/v1/responds/grouped?category=${category}${
					direction !== undefined ? '&direction=' + direction : ''
				}`
			})
		}),
		getResponcesByVacancy: builder.query<
			VacancyRespondItemType[],
			{ id: number; status: string }
		>({
			query: ({ id, status }) => ({
				url: `http://localhost:8082/employment-api/v1/vacancy/${id}/responds?status=${status}`
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
				body: arg
			})
		}),
		deleteVacancyRespond: builder.mutation<void, number>({
			query: id => ({
				url: `http://localhost:8082/employment-api/v1/respond/${id}`,
				method: 'DELETE'
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
	useDeleteVacancyRespondMutation
} = serviceApi
