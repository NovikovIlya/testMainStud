import { apiSlice } from '../apiSlice'


export const taskService = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllSchedules: builder.query<any, any>({
            query: ({subdivisionId,academicYear}) => {
                return {
                    url: `/services/api-practices/practice-schedule?${subdivisionId === null ? '' : `subdivisionId=${subdivisionId}`}&academicYear=${academicYear}`,
                    method: 'GET'
                }
            },
            providesTags: ['Schedule'],
            keepUnusedDataFor:1,
            
        }),
        createSchedule: builder.mutation<any, any>({
            query: (body) => {
                return {
                    url: `/services/api-practices/practice-schedule`,
                    method: 'POST',
                    body: body
                }
            }
        }),
        getByFilter: builder.mutation<any, any>({
            query: (body) => {
                return {
                    url: `/services/api-practices/practice-schedule/content/by-filter`,
                    method: 'POST',
                    body: body
                }
            }
        }),
        getAcademicYear: builder.query<any, void>({
            query: () => {
                return {
                    url: `/services/api-practices/practice-schedule/academic-years`,
                }
            },
        }),
        getSubdivision: builder.query<any, void>({
            query: () => {
                return {
                    url: `/services/api-practices/practice-schedule/subdivisions`,
                }
            },
        }),
        getOneSchedule: builder.query<any, any>({
            query: (scheduleId) => {
                return {
                    url: `/services/api-practices/practice-schedule/lines?scheduleId=${scheduleId}`,
                    method: 'GET',
                }
            }, 
            keepUnusedDataFor:1,
        }),
        deleteRow: builder.mutation<any, any>({
            query: ({scheduleId,practiceId}) => {
                return {
                    url: `/services/api-practices/practice-schedule/line?scheduleId=${scheduleId}&practiceId=${practiceId}`,
                    method: 'DELETE',
                }
            },
        }),
        delete: builder.mutation<any, any>({
            query: (scheduleId) => {
                return {
                    url: `/services/api-practices/practice-schedule?scheduleId=${scheduleId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags:['Schedule'],
     
        }),
        createDocument: builder.query<any, any>({
            query: (academicYear) => {
                return {
                    url: `/services/api-practices/practices/practice-schedule/data?academicYear=${academicYear}`,
                    method: 'GET'
                }
            }
        }),
        getDoc: builder.query<any, any>({
            query: (scheduleId) => {
                return {
                    url: `/services/api-practices/practice-schedule/doc?scheduleId=${scheduleId}`,
                    method: 'GET',
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        return window.URL.createObjectURL(blob); 
                    },
                }
            },
            providesTags: ['Schedule'],
            keepUnusedDataFor:1,
        }),
        
    })
})

export const {
    useCreateDocumentQuery,
    useGetDocQuery,
    useGetAllSchedulesQuery,
    useCreateScheduleMutation,
    useGetByFilterMutation,
    useDeleteRowMutation,
    useGetOneScheduleQuery,
    useDeleteMutation,
    useGetAcademicYearQuery,
    useGetSubdivisionQuery

} = taskService
