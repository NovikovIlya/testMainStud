import { updateStatus } from '../../../models/myPractice'
import { Competences } from '../../../models/practiceTeacher'
import { apiSliceTeacher } from '../apiSliceTeacher'

export const practiceTeacherService = apiSliceTeacher.injectEndpoints({
    endpoints: builder => ({
        getAllPracticeTeacher: builder.query<any, void>({
            query: () => {
                return {
                    url: `/services/api-teacher-practices/practices/all`,
                    method: 'GET'
                }
            },
            providesTags: ['practiceTeacher']
          
        }),
        getOneGroup: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `/services/api-teacher-practices/practices/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['practiceTeacher'],
            keepUnusedDataFor: 1,
          
        }),
        getChat: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `/services/api-teacher-practices/chat/${id}`,
                    method: 'GET'
                    
                }
            },
            providesTags: ['practiceTeacher'],
            keepUnusedDataFor: 1,
         
        }),
        sendMessage: builder.mutation<any, any>({
            query: (body) => {
                return {
                    url: `/services/api-teacher-practices/chat/send`,
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['practiceTeacher']
          
        }),
        updateStatus: builder.mutation<any, updateStatus>({
            query: (body) => {
                return {
                    url: `/services/api-teacher-practices/practices/student/status`,
                    method: 'PATCH',
                    body
                }
            },
            invalidatesTags: ['practiceTeacher']
        }),
        getStatus: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `/services/api-teacher-practices/practices/student/status?studentId=${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['practiceTeacher']        
        }),
        getCompetences: builder.query<any, any>({
            query: ({studentId , orderId }) => {
                return {
                    url: `/services/api-teacher-practices/practices/student/competences?studentId=${studentId}&orderId=${orderId}`,
                    method: 'GET'
                }
            },
            providesTags: ['practiceTeacher'],
            keepUnusedDataFor: 0,   
        }),
        updateCompetences: builder.mutation<any, any>({
            query: ({body,studentId , practiceId }) => {
                return {
                    url: `/services/api-teacher-practices/practices/student/grades?practiceId=${practiceId}&studentId=${studentId}`,
                    method: 'POST',
                    body,
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        return window.URL.createObjectURL(blob); 
                    },
                }
            },
            invalidatesTags: ['practiceTeacher']        
        }),
        updateReportGroup: builder.mutation<any, any>({
            query: ({practiceId,body}) => {
                return {
                    url: `/services/api-teacher-practices/practices/report?practiceId=${practiceId}`,
                    method: 'POST',
                    body,
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        return window.URL.createObjectURL(blob); 
                    },
                }
            },
            invalidatesTags: ['practiceTeacher']        
        }),
        getInfoReportStudent: builder.query<any, any>({
            query: (studentId) => {
                return {
                    url: `/services/api-teacher-practices/practices/student/report?studentId=${studentId}`,
                    method: 'GET'
                }
            },
            providesTags: ['practiceTeacher'],
            keepUnusedDataFor: 0,   
        }),
        getInfoReportGroup: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `/services/api-teacher-practices/practices/group/report?practiceId=${id}`,
                    method: 'GET',
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        return window.URL.createObjectURL(blob); 
                    },
                }
            },
            providesTags: ['practiceTeacher'],
            keepUnusedDataFor: 0,   
            
        }),
        sendToDekanat: builder.mutation<any, any>({
            query: (practiceId) => {
                return {
                    url: `/services/api-teacher-practices/practices/reports/send?practiceId=${practiceId}`,
                    method: 'PATCH',
             
                }
            },
            invalidatesTags: ['practiceTeacher']
        }),
    })
})

export const {
    useGetAllPracticeTeacherQuery,
    useGetOneGroupQuery,
    useGetChatQuery,
    useSendMessageMutation,
    useUpdateStatusMutation,
    useGetStatusQuery,
    useGetCompetencesQuery,
    useUpdateCompetencesMutation,
    useUpdateReportGroupMutation,
    useGetInfoReportStudentQuery,
    useGetInfoReportGroupQuery,
    useSendToDekanatMutation
    
} = practiceTeacherService
