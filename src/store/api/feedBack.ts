import {apiSlice} from './apiSlice'
import {FeedBackData, FeedBackDataWithoutImage} from "../../models/FeedBack";


export const feedBackApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        postFeedBack: builder.mutation({
            query: (values) => {
                const formDataFeedback = new FormData()

                if (values.image === undefined) {
                    for (let key in values) {
                        formDataFeedback.append(key, values[key as keyof FeedBackDataWithoutImage])
                    }
                } else {
                    for (let key in values) {
                        formDataFeedback.append(key, values[key as keyof FeedBackData])
                    }
                }

                console.log(values)
                return {
                    url: `feedback-api/send`,
                    body: formDataFeedback,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data;'
                    },
                    formData:true
                }
            }
        }),

    })
})
export const {
    usePostFeedBackMutation,
} = feedBackApi
