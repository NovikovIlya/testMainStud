import {
    IDocument, IDocumentStatus
} from '../../../models/Practice'
import { apiSlice } from '../apiSlice'


export const taskService = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createDocument: builder.query<any, any>({
            query: (academicYear) => {
                return {
                    url: `/services/api-practices/practices/practice-schedule/data?academicYear=${academicYear}`,
                    method: 'GET'
                }
            }
        }),
        getDoc: builder.query<any, any>({
            query: (academicYear) => {
                return {
                    url: `/services/api-practices/practices/practice-schedule/doc?academicYear=${academicYear}`,
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
    useGetDocQuery
} = taskService
