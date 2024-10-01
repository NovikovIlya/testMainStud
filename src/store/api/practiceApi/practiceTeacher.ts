import { AnyAction } from '@reduxjs/toolkit'
import { myPractice } from '../../../models/myPractice'
import { apiSliceStudent } from '../apiSliceStudent'

export const practiceTeacherService = apiSliceStudent.injectEndpoints({
    endpoints: builder => ({
        getAllPracticeTeacher: builder.query<any, void>({
            query: () => {
                return {
                    url: `/services/api-student-practices/practices/all`,
                    method: 'GET'
                }
            },
            providesTags: ['practiceTeacher']
          
        }),
        
        
    })
})

export const {
    useGetAllPracticeTeacherQuery,
    
    
} = practiceTeacherService
