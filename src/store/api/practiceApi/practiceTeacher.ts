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
        getCompetences: builder.query<Competences[], any>({
            query: ({studentId , orderId }) => {
                return {
                    url: `/services/api-teacher-practices/practices/student/competences?studentId=${studentId}&orderId=${orderId}`,
                    method: 'GET'
                }
            },
            providesTags: ['practiceTeacher'],
            keepUnusedDataFor: 0,   
        }),
        updateCompetences: builder.mutation<Competences[], any>({
            query: ({body,studentId , practiceId }) => {
                return {
                    url: `/services/api-teacher-practices/practices/student/grades?practiceId=${practiceId}&studentId=${studentId}`,
                    method: 'POST',
                    body,
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
    useUpdateCompetencesMutation
    
} = practiceTeacherService
