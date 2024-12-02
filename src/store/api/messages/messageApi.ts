import { apiSlice } from '../apiSlice'


export const messagesService = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllSchedules: builder.query<any, any>({
            query: ({subdivisionId,academicYear}) => {
                return {
                    url: `/services/api-practices/practice-schedule?${subdivisionId === null ? '' : `subdivisionId=${subdivisionId}&`}academicYear=${academicYear}`,
                    method: 'GET'
                }
            },
            providesTags: ['Messages'],
            keepUnusedDataFor:1,
            
        }),

        
    })
})

export const {

    useGetAllSchedulesQuery,
  

} = messagesService
