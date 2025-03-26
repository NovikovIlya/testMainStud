import { apiSlice } from "../apiSlice";

export const myPracticeService = apiSlice.injectEndpoints({
    endpoints: builder => ({
      // Аватарка
      getAvatar: builder.query<string, void>({
        query: () => ({
          url: '/user-api/settings/photo',
          method: 'GET',
          responseHandler: (response) => response.blob(),
        }),
        transformResponse: (blob: Blob) => {
          return URL.createObjectURL(blob);
        },
        providesTags: ['Avatar'],
        keepUnusedDataFor: 1,
      }),
      putAvatar: builder.mutation<any, any>({
        query: (formData) => ({
            url: '/user-api/settings/photo',
            method: 'PUT',
            body: formData,
            responseHandler: (response) => response.blob(),
          }),
          transformResponse: (blob: Blob) => {
            return URL.createObjectURL(blob);
          },
          invalidatesTags: ['Avatar'],
      }),
      addAvatar: builder.mutation<string, FormData>({
        query: (formData) => ({
          url: '/user-api/settings/photo',
          method: 'POST',
          body: formData,
          responseHandler: (response) => response.blob(),
        }),
        transformResponse: (blob: Blob) => {
          return URL.createObjectURL(blob);
        },
        invalidatesTags: ['Avatar'],
      }),

      //  Личные данные
      //  Знание языкв
    })
  });


  export const { useAddAvatarMutation,useGetAvatarQuery,usePutAvatarMutation } = myPracticeService;