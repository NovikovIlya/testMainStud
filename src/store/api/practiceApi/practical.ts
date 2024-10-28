import {apiSlice} from "../apiSlice";
import {Departments} from "../../../models/Practice";

export const practical = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCafDepartments: builder.query<Departments[], any>({
            query: (id) => ({
                url: `services/api-practices/kpfu/departments?subdivisionId=${id}`,
                method: 'GET',
            })
        }),
        deletePractise: builder.mutation<void, string>({
            query: (id) => {
                return {
                    url: `services/api-practices/practices/${id}`,
                    method: 'DELETE',
                }
            },
            // @ts-ignore
            invalidatesTags: ['Practise']
        }),
        deletePractiseSeveral: builder.mutation<void, any>({
            query: (body) => {
                return {
                    url: `services/api-practices/practices/several`,
                    method: 'DELETE',
                    body,
                }
            },
            // @ts-ignore
            invalidatesTags: ['Practise']
        }),
        getAllPracticesFinal: builder.query<any, void>({
            query: () => ({
                url: `services/api-teacher-practices/final-check/practices`,
                method: 'GET',
            })
        }),
        getAllStudentsFinal: builder.query<any, any>({
            query: (id) => ({
                url: `services/api-teacher-practices/final-check/students?studentId=${id}`,
                method: 'GET',
            })
        }),
    })
})
export const {
    useGetCafDepartmentsQuery,
    useDeletePractiseMutation,
    useDeletePractiseSeveralMutation,
    useGetAllPracticesFinalQuery,
    useGetAllStudentsFinalQuery
} = practical
