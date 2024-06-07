import {apiSlice} from "../apiSlice";
import {Departments} from "../../../models/Practice";

export const practical = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCafDepartments: builder.query<Departments[], void>({
            query: () => ({
                url: 'services/api-practices/kpfu/departments',
                method: 'GET',
            })
        })
    })
})
export const {
    useGetCafDepartmentsQuery,
} = practical
