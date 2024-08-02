import {
    IDocument, IDocumentStatus
} from '../../../models/Practice'
import { apiSlice } from '../apiSlice'


export const taskService = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllSchedules: builder.query<any, any>({
            query: ({subdivisionId,academicYear}) => {
                return {
                    url: `/services/api-practices/practice-schedule?${subdivisionId === null ? '' : `subdivisionId=${subdivisionId}`}&academicYear=${academicYear}`,
                    method: 'GET'
                }
            }
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
        deleteRow: builder.mutation<any, any>({
            query: (body) => {
                return {
                    url: `/services/api-practices/practice-schedule/line?scheduleId=${'s'}&practiceId=${'s'}`,
                    method: 'DELETE',
                    body: body
                }
            }
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
            }
        }),
        
    })
})

export const {
    useCreateDocumentQuery,
    useGetDocQuery,
    useGetAllSchedulesQuery,
    useCreateScheduleMutation,
    useGetByFilterMutation,
    useDeleteRowMutation

} = taskService
