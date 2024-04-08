import {apiSlice} from './apiSlice'
import {FeedBackData, FeedBackDataWithoutImage} from "../../models/FeedBack";



export const feedBackApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        postFeedBack: builder.mutation({
            query: (values) => {
                // const formDataFeedback = new FormData()
                //
                // if (values.image === undefined) {
                //     for (let key in values) {
                //         formDataFeedback.append(key, values[key as keyof FeedBackDataWithoutImage])
                //     }
                // } else {
                //     for (let key in values) {
                //         formDataFeedback.append(key, values[key as keyof FeedBackData])
                //     }
                // }

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
