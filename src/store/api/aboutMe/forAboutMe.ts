import { UserDto } from "../../../models/aboutMe";
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
      getAboutMe: builder.query<UserDto, void>({
        query: () => ({
          url: '/about-me/about-me',
          method: 'GET',
         
        }),
        
        providesTags: ['AboutMe'],
        keepUnusedDataFor: 1,
      }),


      //  Знание языков
      getNativeLanguages: builder.query<any, void>({
        query: () => ({
          url: '/languages/native',
          method: 'GET',
         
        }),
        providesTags: ['nativeLanguages'],
        keepUnusedDataFor: 1,
      }),


      getforeignLanguages: builder.query<any, void>({
        query: () => ({
          url: '/languages/foreign',
          method: 'GET',
         
        }),
        providesTags: ['foreignLanguages'],
        keepUnusedDataFor: 1,
      }),
    })
  });


  export const { 
    useAddAvatarMutation,
    useGetAvatarQuery,
    usePutAvatarMutation,
    useGetAboutMeQuery,
    useGetNativeLanguagesQuery,
    useGetforeignLanguagesQuery
   } = myPracticeService;