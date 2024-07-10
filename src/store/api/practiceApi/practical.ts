import {apiSlice} from "../apiSlice";
import {Departments} from "../../../models/Practice";

export const practical = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCafDepartments: builder.query<Departments[], any>({
            query: (id) => ({
                url: `services/api-practices/kpfu/departments?subdivisionId=${id}`,
                method: 'GET',
            })
        })
    })
})
export const {
    useGetCafDepartmentsQuery,
} = practical
