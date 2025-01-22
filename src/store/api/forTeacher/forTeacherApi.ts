import { apiSlice } from '../apiSlice'


export const fotTeacherService = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployeesMessage: builder.query<any, any>({
            query: (name) => {
                return {
                    url: `/user-api/chat/employees?name=${name}`,
                    method: 'GET'
                }
            },
            providesTags: ['Messages'],
            keepUnusedDataFor:1,
        }),
       
    })
})

export const {
    useGetEmployeesMessageQuery,
} = fotTeacherService

