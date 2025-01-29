import { apiSlice } from '../apiSlice'
import { emptyApiSlice } from '../emptyApiSlice'
import { testApiSlice } from '../testApiSlice'


export const ShortLinkApi = emptyApiSlice.injectEndpoints({
    endpoints: builder => ({
        sendShortLink: builder.mutation<any, any>({
            query: (body) => {
            return {
                    url: `https://s.kpfu.ru/yourls-api.php`,
                    method: 'POST',
                    body
                }
            },
         
           
        }),
       
    })
})

export const {
    useSendShortLinkMutation,
} = ShortLinkApi

