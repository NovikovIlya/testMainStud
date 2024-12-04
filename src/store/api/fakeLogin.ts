import {apiSliceNotAuth} from './apiSliceNotAuth'

export const authApiSlice = apiSliceNotAuth.injectEndpoints({
    endpoints: builder => ({
       
        fakeLogin: builder.mutation({
            query: credentials => {
                return {
                    url: 'user-api/login',
                    method: 'POST',
                    body: {...credentials}
                }
            }
        }),
      
       
        
    })
})

export const {


    useFakeLoginMutation
} = authApiSlice
