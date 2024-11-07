import {IApproveRequest} from '../../api/types'
import {
    DocumentDocumentation,
    DocumentLib,
    Documentation,
    Email,
    Exam,
    ICalendar,
    IPerformance,
    Template,
    TypeSchedule,
} from '../reducers/type'

import {apiSlice} from './apiSlice'
import i18n from "i18next";

export const serviceApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSchedule: builder.query<TypeSchedule, void>({
            query: () => `schedule-api/schedule`
        }),
        getPerformance: builder.query<IPerformance, void>({
            query: () => 'academic-performance-api/performance'
        }),
        getExamsSchedule: builder.query<Exam[], void>({
            query: () => 'study-plan-api/studyplan/examsSchedule'
        }),
        getStudyPlan: builder.query<ICalendar, void>({
            query: () => 'study-plan-api/studyplan'
        }),
        getEmail: builder.query<Email[], void>({
            query: () => 'user-api/settings/emails',
            keepUnusedDataFor: 1,
            providesTags: ['emails']
        }),
        getTemplates: builder.query<Template[], void>({
            query: () => 'unified-center-api/templates'
        }),
        getPracticeDocuments: builder.query<Template[], void>({
            query: () => 'unified-center-api/practice-documents'
        }),
        getDocumentsLibraries: builder.query<DocumentLib[], void>({
            query: () => 'unified-center-api/documents/online-libraries'
        }),
        getDocumentsTemplates: builder.query<DocumentLib[], void>({
            query: () => 'unified-center-api/documents/templates'
        }),
        getDocumentsPractice: builder.query<DocumentLib[], void>({
            query: () => 'unified-center-api/documents/practice-documents'
        }),
        getDocumentsMy: builder.query<DocumentLib[], void>({
            query: () => 'unified-center-api/documents/my-documents'
        }),
        getDocumentsDocumentation: builder.query<DocumentDocumentation, void>({
            query: () => 'unified-center-api/documents/documentation'
        }),
        getMyQWEDocuments: builder.query<Template[], void>({
            query: () => 'unified-center-api/my-documents'
        }),
        getDocumentation: builder.query<Documentation, void>({
            query: () => 'unified-center-api/documentation'
        }),
        getPhoneUser: builder.query<Array<any>, void>({
            query: () => 'user-api/settings/phones',
            providesTags: ['phones'],
            keepUnusedDataFor: 1,
        }),
        getSubdivisionUser: builder.query<any, void>({
            query: () => 'services/api-practices/user/subdivision'
        }),
        postPhone: builder.mutation({
            query: phone => {
                return {
                    url: 'user-api/settings/phones',
                    body: phone,
                    method: 'POST'
                }
            },
            invalidatesTags:['phones']
        }),
        verifyAccPhone: builder.mutation({
            query: id => {
                return {
                    url: `user-api/settings/phones/${id}/send-verification`,
                    method: 'POST'
                }
            },
            // invalidatesTags:['phones']
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
            query: (email) => {
                return {
                    url: 'user-api/settings/emails',
                    body: email,
                    method: 'POST'
                }
            },
            invalidatesTags:['emails']
        }),
        deleteAcc: builder.mutation({
            query: id => {
                return {
                    url: `user-api/settings/emails/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags:['emails']
        }),
        deleteAccPhone: builder.mutation({
            query: id => {
                return {
                    url: `user-api/settings/phones/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags:['phones']
        }),
        verifyAcc: builder.mutation({
            query: id => {
                return {
                    url: `user-api/settings/emails/${id}/send-verification`,
                    method: 'POST'
                }
            },
            invalidatesTags:['emails']
        }),
        finalVerify: builder.mutation({
            query: (obj) => {
                return {
                    url: `user-api/settings/emails/${obj.id}/verify`,
                    method: 'POST',
                    body: obj
                }
            },
            invalidatesTags:['emails']
        }),
        finalVerifyPhone: builder.mutation({
            query: (obj) => {
                return {
                    url: `user-api/settings/phones/${obj.id}/verify`,
                    method: 'POST',
                    body: obj
                }
            },
            invalidatesTags:['phones']
        }),
        setRole: builder.mutation({
            query: (body: { role: string }) => {
                return {
                    url: 'user-api/users/me/role',
                    body: body,
                    method: 'POST'
                }
            }
        })
       
    })
})
export const {
    useGetDocumentsDocumentationQuery,
    useGetDocumentsMyQuery,
    useGetDocumentsPracticeQuery,
    useGetDocumentsTemplatesQuery,
    useGetDocumentsLibrariesQuery,
    useGetPerformanceQuery,
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
    useGetSubdivisionUserQuery,
    useFinalVerifyMutation,
    useDeleteAccMutation,
    useVerifyAccPhoneMutation,
    useFinalVerifyPhoneMutation,
    useDeleteAccPhoneMutation
    
} = serviceApi
