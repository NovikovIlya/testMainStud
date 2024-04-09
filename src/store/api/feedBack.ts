import {apiSlice} from './apiSlice'




export const feedBackApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        postFeedBack: builder.mutation({
            query: (values) => {
                return {
                    url: `feedback-api/send`,
                    body: values,
                    method: 'POST',
                    //заголовки для multipart/formData в ручную писать не надо
                }
            }
        }),

    })
})
export const {
    usePostFeedBackMutation,
} = feedBackApi
