import { myPractice, myPracticeOne } from '../../../models/myPractice'
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

    })
})

export const {
    useGetAllMyPracticesQuery,
    useGetOneMyPracticesQuery
    
} = myPracticeService
