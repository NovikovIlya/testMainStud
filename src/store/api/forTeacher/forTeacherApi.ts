import { dataBrs } from '../../../models/forTeacher'
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
        getBrsForTeacher: builder.query<dataBrs, any>({
            query: ({subjectId,groupId}) => {
            return {
                    url: `/to-teacher/brs/grades?subjectId=${subjectId}&groupId=${groupId}`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherSceduleBrs'],
            keepUnusedDataFor:0,
        }),

        getBrsSubjects: builder.query<any, void>({
            query: () => {
            return {
                    url: `/to-teacher/brs/subjects`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherSceduleBrs'],
            keepUnusedDataFor:0,
        }),

        getBrsGroups: builder.query<any, void>({
            query: (subjectId ) => {
            return {
                    url: `/to-teacher/brs/groups?subjectId=${subjectId}`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherSceduleBrs'],
            keepUnusedDataFor:0,
        }),

        saveBrs: builder.mutation<any, any>({
            query: (body ) => {
            return {
                    url: `/to-teacher/brs/grades/save`,
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['forTeacherSceduleBrs'],
        }),

        getVedomostSubjects: builder.query<any, void>({
            query: () => {
            return {
                    url: `/to-teacher/vedomost/subjects`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherSceduleVedomost'],
            keepUnusedDataFor:0,
        }),
        getVedomostGroups: builder.query<any, void>({
            query: (subjectId ) => {
            return {
                    url: `/to-teacher/vedomost/groups?subjectId=${subjectId}`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherSceduleVedomost'],
            keepUnusedDataFor:0,
        }),
        getVedomostForTeacher: builder.query<any, any>({
            query: ({subjectId,groupId}) => {
            return {
                    url: `/to-teacher/vedomost/vedomost?subjectId=${subjectId}&groupId=${groupId}`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherSceduleVedomost'],
            keepUnusedDataFor:0,
        }),
       
    })
})

export const {
    useGetScheduleForTeacherQuery,
    useGetBrsForTeacherQuery,
    useGetBrsGroupsQuery,
    useGetBrsSubjectsQuery,
    useSaveBrsMutation,
    useGetVedomostSubjectsQuery,
    useGetVedomostGroupsQuery,
    useGetVedomostForTeacherQuery
} = fotTeacherService

