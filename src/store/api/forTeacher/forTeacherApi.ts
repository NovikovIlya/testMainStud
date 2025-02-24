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
            query: ({subjectId,groupId,year,semester}) => {
            return {
                    url: `/to-teacher/brs/grades?subjectId=${subjectId}&groupId=${groupId}&year=${year}&semester=${semester}`,
                    method: 'GET'
                }
            },
            providesTags: ['forTeacherSceduleBrs'],
            keepUnusedDataFor:0,
        }),

        getBrsSubjects: builder.query<any, any>({
            query: ({year,semester}) => {
            return {
                    url: `/to-teacher/brs/subjects?year=${year}&semester=${semester}`,
                    method: 'GET'
                }
            },
            // providesTags: ['forTeacherSceduleBrs'],
            keepUnusedDataFor:0,
        }),

        getBrsGroups: builder.query<any, any>({
            query: ({subjectId,year,semester} ) => {
            return {
                    url: `/to-teacher/brs/groups?subjectId=${subjectId}&year=${year}&semester=${semester}`,
                    method: 'GET'
                }
            },
            // providesTags: ['forTeacherSceduleBrs'],
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
        saveVedomost: builder.mutation<any, any>({
            query: (body ) => {
            return {
                    url: `/to-teacher/vedomost/vedomost/save`,
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['forTeacherSceduleVedomost'],
        }),

        getVedomostSubjects: builder.query<any, any>({
            query: ({year,semester}) => {
            return {
                    url: `/to-teacher/vedomost/subjects?year=${year}&semester=${semester}`,
                    method: 'GET'
                }
            },
            // providesTags: ['forTeacherSceduleVedomost'],
            keepUnusedDataFor:0,
        }),
        getVedomostGroups: builder.query<any, any>({
            query: ({subjectId,year,semester} ) => {
            return {
                    url: `/to-teacher/vedomost/groups?subjectId=${subjectId}&year=${year}&semester=${semester}`,
                    method: 'GET'
                }
            },
            // providesTags: ['forTeacherSceduleVedomost'],
            keepUnusedDataFor:0,
        }),
        getVedomostForTeacher: builder.query<any, any>({
            query: ({subjectId,groupId,year,semester,type}) => {
            return {
                    url: `/to-teacher/vedomost/vedomost?subjectId=${subjectId}&groupId=${groupId}&year=${year}&semester=${semester}&type=${type}`,
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
    useGetVedomostForTeacherQuery,
    useSaveVedomostMutation
} = fotTeacherService

