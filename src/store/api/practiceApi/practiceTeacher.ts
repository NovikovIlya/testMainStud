import { AnyAction } from '@reduxjs/toolkit'
import { myPractice } from '../../../models/myPractice'
import { apiSliceStudent } from '../apiSliceStudent'
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
        
        
    })
})

export const {
    useGetAllPracticeTeacherQuery,
    
    
} = practiceTeacherService
