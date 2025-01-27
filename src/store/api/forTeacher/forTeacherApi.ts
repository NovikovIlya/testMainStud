import { apiSlice } from '../apiSlice'
import { testApiSlice } from '../testApiSlice'


export const fotTeacherService = testApiSlice.injectEndpoints({
    endpoints: builder => ({
        getScheduleForTeacher: builder.query<any, any>({
            query: ({year,semester}) => {
            return {
                    url: `/to-teacher/schedule?year=${year}&semester=${semester}`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherScedule'],
            keepUnusedDataFor:0,
        }),
       
    })
})

export const {
    useGetScheduleForTeacherQuery,
} = fotTeacherService

