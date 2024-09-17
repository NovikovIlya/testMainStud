import { apiSlice } from '../apiSlice'
import { apiSliceStudent } from '../apiSliceStudent'


export const myPracticeService = apiSliceStudent.injectEndpoints({
    endpoints: builder => ({
        getAllMyPractices: builder.query<any, void>({
            query: () => {
                return {
                    url: `/services/api-student-practices/practices/all`,
                    method: 'GET'
                }
            },
            providesTags: ['MyPractices'],
            keepUnusedDataFor:1,
        }),
        getOneMyPractices: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `/services/api-student-practices/practices/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['MyPractices'],
            keepUnusedDataFor:1,
        }),

    })
})

export const {
    useGetAllMyPracticesQuery,
    useGetOneMyPracticesQuery
    
} = myPracticeService
