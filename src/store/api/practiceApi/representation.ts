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
        getSubmissionsSubdevision: builder.query<any, void>({
            query: () => {
                return {
                    url: `/services/api-practices/submissions/list/subdivisions`,
                    method: 'GET'
                }
            },
            providesTags: ['Submissions'],
            keepUnusedDataFor:1,
        }),
        getSubmissionsSpecialties: builder.query<any, any>({
            query: (subdivisionId ) => {
                return {
                    url: `/services/api-practices/submissions/list/specialties?subdivisionId=${subdivisionId}`,
                    method: 'GET'
                }
            },
            providesTags: ['Submissions'],
            keepUnusedDataFor:1,
        }),
        getSubmissionsPracticeType: builder.query<any, any>({
            query: (subdivisionId ) => {
                return {
                    url: `/services/api-practices/submissions/list/practice-types?subdivisionId=${subdivisionId}`,
                    method: 'GET'
                }
            },
            providesTags: ['Submissions'],
            keepUnusedDataFor:1,
        }),
        getSubmissionsPracticeKind: builder.query<any, any>({
            query: (subdivisionId ) => {
                return {
                    url: `/services/api-practices/submissions/list/practice-kinds?subdivisionId=${subdivisionId}`,
                    method: 'GET'
                }
            },
            providesTags: ['Submissions'],
            keepUnusedDataFor:1,
        }),
        getSubmissionsDirector: builder.query<any, any>({
            query: (subdivisionId ) => {
                return {
                    url: `/services/api-practices/submissions/list/department-directors?subdivisionId=${subdivisionId}`,
                    method: 'GET'
                }
            },
            providesTags: ['Submissions'],
            keepUnusedDataFor:1,
        }),
        getSubmissionsAcademicYear: builder.query<any, any>({
            query: (subdivisionId ) => {
                return {
                    url: `/services/api-practices/submissions/list/academic-years?subdivisionId=${subdivisionId}`,
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
        editSubmission: builder.mutation<any, any>({
            query: (body) => {
                return {
                    url: `/services/api-practices/submissions`,
                    method: 'PUT',
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
        getDocRepresentation: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `/services/api-practices/submissions/doc/${id}`,
                    method: 'GET',
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        return window.URL.createObjectURL(blob); 
                    },
                }
            },
          
            keepUnusedDataFor:1,
        }),
        getDocOrder: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `/services/api-practices/orders/doc/${id}`,
                    method: 'GET',
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        return window.URL.createObjectURL(blob); 
                    },
                }
            },
          
            keepUnusedDataFor:1,
        }),
        changeStatus: builder.mutation<any, any>({
            query: (submissionId ) => {
                return {
                    url: `/services/api-practices/submissions/change-status?submissionId=${submissionId }`,
                    method: 'PATCH',
                   
                }
            },
            invalidatesTags: ['Submissions'],  
        }),
        changeStatusOrder: builder.mutation<any, any>({
            query: (orderId) => {
                return {
                    url: `/services/api-practices/orders/change-status?orderId=${orderId}`,
                    method: 'PATCH',
                   
                }
            },
            invalidatesTags: ['Order','Submissions'],  
        }),
        getAllOrder: builder.query<any, any>({
            query: ({subdivisionId ,page ,size } ) => {
                return {
                    url: `services/api-practices/orders/all/by-page?subdivisionId=${subdivisionId}&page=${page}&size=${size}`,
                    method: 'GET',
                   
                }
            },
            providesTags: ['Order'],
            keepUnusedDataFor:1,
        }),

        getAllApplications: builder.query<any, any>({
            query: ({subdivisionId ,page ,size } ) => {
                return {
                    url: `services/api-practices/application-four/all/by-page?subdivisionId=${subdivisionId}&page=${page}&size=${size}`,
                    method: 'GET',
                   
                }
            },
            providesTags: ['Application'],
            keepUnusedDataFor:1,
        }),
        getAllOrderAgree: builder.query<any, any>({
            query: ({subdivisionId ,page ,size } ) => {
                return {
                    url: `services/api-practices/orders/agreed/by-page?subdivisionId=${subdivisionId}&page=${page}&size=${size}`,
                    method: 'GET',
                   
                }
            },
            providesTags: ['Application'],
            keepUnusedDataFor:1,
        }),
        addApplication: builder.mutation<any, any>({
            query: (body) => {
                return {
                    url: `/services/api-practices/application-four`,
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: ['Application'],  
        }),
        getOneApplication: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `services/api-practices/application-four/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['Submissions','Application'],
            keepUnusedDataFor:1,
        }),
        getDocApplication: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `/services/api-practices/orders/doc/${id}`,
                    method: 'GET',
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        return window.URL.createObjectURL(blob); 
                    },
                }
            },
          
            keepUnusedDataFor:1,
        }),
        deleteApplication: builder.mutation<any, any>({
            query: (id) => {
                return {
                    url: `/services/api-practices/application-four?applicationId=${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Submissions','Application']
        }),
        editApplication: builder.mutation<any, any>({
            query: ({id,body}) => {
                return {
                    url: `/services/api-practices/application-four?applicationId=${id}`,
                    method: 'PUT',
                    body:body
                }
            },
            invalidatesTags: ['Submissions','Application'],  
        }),

        
    })
})

export const {
    useGetAllSubmissionsQuery,
    useAddSubmissionMutation,
    useGetStudentsQuery,
    useGetOneSubmissionsQuery,
    useDeleteSubmissionMutation,
    useGetDocRepresentationQuery,
    useEditSubmissionMutation,
    useGetSubmissionsSubdevisionQuery,
    useGetSubmissionsSpecialtiesQuery,
    useGetSubmissionsPracticeTypeQuery,
    useGetSubmissionsPracticeKindQuery,
    useGetSubmissionsDirectorQuery,
    useGetSubmissionsAcademicYearQuery,
    useChangeStatusMutation,

    useGetAllOrderQuery,
    useChangeStatusOrderMutation,
    useGetDocOrderQuery,

    useGetAllApplicationsQuery,
    useAddApplicationMutation,
    useGetOneApplicationQuery,
    useGetDocApplicationQuery,
    useDeleteApplicationMutation,
    useEditApplicationMutation,
    useGetAllOrderAgreeQuery
} = representationService
