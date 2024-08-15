import { apiSlice } from '../apiSlice'


export const representationService = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllSubmissions: builder.query<any, any>({
            query: (subdivisionId) => {
                return {
                    url: `/services/api-practices/submissions/all${subdivisionId === null ? '' : `?subdivisionId=${subdivisionId}`}`,
                    method: 'GET'
                }
            },
            providesTags: ['Submissions'],
            keepUnusedDataFor:1,
        }),
        getOneSubmissions: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `/services/api-practices/submissions/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['Submissions'],
            keepUnusedDataFor:1,
        }),
        getStudents: builder.query<any, any>({
            query: (practiceId) => {
                return {
                    url: `/services/api-practices/practices/students?practiceId=${practiceId}`,
                    method: 'GET'
                }
            },
            providesTags: ['Submissions'],
            keepUnusedDataFor:1,
        }),
        addSubmission: builder.mutation<any, any>({
            query: (body) => {
                return {
                    url: `/services/api-practices/submissions`,
                    method: 'POST',
                    body:body
                }
            },
            invalidatesTags: ['Submissions'],  
        }),
        deleteSubmission: builder.mutation<any, any>({
            query: (id) => {
                return {
                    url: `/services/api-practices/submissions?submissionId=${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Submissions']
        }),

        
    })
})

export const {
    useGetAllSubmissionsQuery,
    useAddSubmissionMutation,
    useGetStudentsQuery,
    useGetOneSubmissionsQuery,
    useDeleteSubmissionMutation
} = representationService
