import {apiSlice} from './apiSlice'


export const feedBackApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        postFeedBack: builder.mutation({
            query: (formData: FormData) => {
                return {
                    url: `feedback-api/send`,
                    body: formData,
                    method: 'POST',
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            }
        }),

    })
})
export const {
    usePostFeedBackMutation,
} = feedBackApi
