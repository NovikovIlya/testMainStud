import { addDiary, addTask, DataMessages, myPractice, myPracticeOne } from '../../../models/myPractice'
import { apiSlice } from '../apiSlice'
import { apiSliceStudent } from '../apiSliceStudent'

export const myPracticeService = apiSliceStudent.injectEndpoints({
    endpoints: builder => ({
        getAllMyPractices: builder.query<myPractice[], void>({
            query: () => {
                return {
                    url: `/services/api-student-practices/practices/all`,
                    method: 'GET'
                }
            },
            providesTags: ['MyPractices'],
            keepUnusedDataFor:1,
        }),
        getOneMyPractices: builder.query<myPracticeOne, any>({
            query: (id) => {
                return {
                    url: `/services/api-student-practices/practices/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['MyPractices'],
            keepUnusedDataFor:1,
        }),
        addTasks: builder.mutation<any, addTask>({
            query: (body) => {
                return {
                    url: `/services/api-student-practices/documents/tasks`,
                    method: 'POST',
                    body:body,
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        return window.URL.createObjectURL(blob); 
                    },
                }
            },
            invalidatesTags: ['MyPractices'],
        }),
        addDiary: builder.mutation<any, addDiary>({
            query: (body) => {
                return {
                    url: `/services/api-student-practices/documents/diary`,
                    method: 'POST',
                    body:body,
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        return window.URL.createObjectURL(blob); 
                    },
                }
            },
            invalidatesTags: ['MyPractices'],
        }),
        addReport: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `/services/api-student-practices/documents/report?practiceId=${id}`,
                    method: 'GET',
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        return window.URL.createObjectURL(blob); 
                    },
                }
            },
            providesTags: ['MyPractices'],
        }),
        addSend: builder.mutation<any, DataMessages>({
            query: (body) => {
                return {
                    url: `/services/api-student-practices/chat/send`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['MyPractices'],
        }),
        getAttachment: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `services/api-student-practices/chat/attachment/${id}`,
                    method: 'GET',
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        return window.URL.createObjectURL(blob); 
                    },
                }
            },
            providesTags: ['MyPractices'],
            keepUnusedDataFor:1,
        }),
        
    })
})

export const {
    useGetAllMyPracticesQuery,
    useGetOneMyPracticesQuery,
    useAddTasksMutation,
    useAddDiaryMutation,
    useAddReportQuery,
    useAddSendMutation,
    useGetAttachmentQuery
    
} = myPracticeService
