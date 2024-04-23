import {IListTeacher, MainTeacherData, TestQuery} from '../types/type'

import {apiSlice} from './apiSlice'
import i18n from "i18next";

export const serviceApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTeachersRating: builder.query<IListTeacher, void>({
            query: () => 'academic-performance-api/teachers-rating'
        }),

        getTeacherInfo: builder.query<MainTeacherData, number>({
            query: (id) => ({
                url: `academic-performance-api/teachers-rating/${id}`,
                headers: {
                    'Accept-Language': i18n.language
                }
            })
        }),

        postTeacherRating: builder.mutation({
            query: (arg: TestQuery) => {
                return {
                    url: `academic-performance-api/teachers-rating/${arg.id}`,
                    body: arg.rating,
                    method: 'POST',
                }
            }
        }),

    })
})
export const {
    useGetTeachersRatingQuery,
    useGetTeacherInfoQuery,
    usePostTeacherRatingMutation,
} = serviceApi
