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
    })
})
export const {
    useGetCafDepartmentsQuery,
    useDeletePractiseMutation,
    useDeletePractiseSeveralMutation
} = practical
