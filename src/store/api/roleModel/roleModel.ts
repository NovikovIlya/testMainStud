
import { apiSlice } from "../apiSlice";

export const roleModelService = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getModules: builder.query<any, void>({
            query: () => {
                return {
                    url: 'user-api/user/modules',
                    method: 'GET',

                }
            },
            keepUnusedDataFor:1,
        }),

    })
})
export const {
    useGetModulesQuery
} = roleModelService
