import { apiSlice } from '../apiSlice'
import { emptyApiSlice } from '../emptyApiSlice'
import { testApiSlice } from '../testApiSlice'


export const ShortLinkApi = emptyApiSlice.injectEndpoints({
    endpoints: builder => ({
        sendShore: builder.query<any, any>({
            query: () => {
            return {
                    url: `/yourls-api.php`,           
                }
            },
            providesTags: ['ShortLink'],
           
        }),
        sendShortLink: builder.mutation<any, any>({
            query: (body) => {
            return {
                    url: `https://s.kpfu.ru/yourls-api.php`,
                   
                    method: 'POST',
                    body :new URLSearchParams(body),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Referer': 'https://shelly.kpfu.ru/',
                        'Accept': '*/*',
                    },
                    responseHandler: (response) => response.text(),
                   
                }
            },
            invalidatesTags: ['ShortLink'],
            
            transformResponse: (response) => {
                // Возвращаем объект с новым URL
                return { newUrl: response }; // Создаем объект с полем newUrl
            },
           
        }),

    })
})

export const {
    useSendShoreQuery,
    useSendShortLinkMutation
} = ShortLinkApi

