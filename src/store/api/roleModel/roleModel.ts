
import { apiSlice } from "../apiSlice";

export const roleModelService = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRole: builder.query<void, void>({
            query: () => {
                return {
                    url: 'services/api-practices/contracts',
                    method: 'HEAD',

                }
            }
        }),

    })
})
export const {
    
} = roleModelService
