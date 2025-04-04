import { UserDto } from "../../../models/aboutMe";
import { apiSlice } from "../apiSlice";

export const myPracticeService = apiSlice.injectEndpoints({
    endpoints: builder => ({
      // Аватарка
      getAvatar: builder.query<any, void>({
        query: () => ({
          url: '/about-me/get-photo',
          method: 'GET',
          // responseHandler: (response) => response.blob(),
        }),
        // transformResponse: (blob: Blob) => {
        //   return URL.createObjectURL(blob);
        // },
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
          url: '/about-me/set-photo',
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
      setComment: builder.mutation<any, any>({
        query: (body) => ({
            url: '/about-me/set-comment',
            method: 'POST',
            body,
           
          }),
         
          invalidatesTags: ['AboutMe'],
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
      getAllNativeLanguages: builder.query<any, void>({
        query: () => ({
          url: '/languages',
          method: 'GET',
         
        }),
        providesTags: ['nativeLanguages'],
        keepUnusedDataFor: 1,
      }),
      setNative: builder.mutation<any, any>({
        query: (body) => ({
            url: '/languages/native',
            method: 'POST',
            body,
           
          }),
         
          invalidatesTags: ['nativeLanguages'],
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
    useGetforeignLanguagesQuery,
    useSetCommentMutation,
    useGetAllNativeLanguagesQuery,
    useSetNativeMutation,
   } = myPracticeService;