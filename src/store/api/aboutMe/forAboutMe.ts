import { CheckedFlags, foreignLanguageAll, socActivity, UserDto } from "../../../models/aboutMe";
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
            url: '/about-me/set-photo',
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
      deleteAvatar: builder.mutation<any, void>({
        query: () => ({
          url: '/about-me/set-photo',
          method: 'DELETE',
        }),
     
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
      // Чекбоксы
      getCheckbox: builder.query<any, void>({
        query: () => ({
          url: '/about-me/get-checkboxes',
          method: 'GET',
         
        }),
        providesTags: ['Сheckboxes'],
        keepUnusedDataFor: 1,
      }),
      setCheckbox: builder.mutation<CheckedFlags, any>({
        query: (body) => ({
            url: '/about-me/set-checkboxes',
            method: 'POST',
            body,
           
          }),
          invalidatesTags: ['Сheckboxes'],
      }),


      //  Знание языков
      getNativeLanguages: builder.query<any, void>({
        query: () => ({
          url: '/activities/languages/native',
          method: 'GET',
         
        }),
        providesTags: ['nativeLanguages'],
        keepUnusedDataFor: 1,
      }),
      getAllNativeLanguages: builder.query<any, void>({
        query: (isForeign) => ({
          url: `/activities/languages/all?isForeign=false`,
          method: 'GET',
         
        }),
        providesTags: ['nativeLanguages'],
        keepUnusedDataFor: 1,
      }),
      setNative: builder.mutation<any, any>({
        query: (body) => ({
            url: '/activities/languages/native',
            method: 'POST',
            body,
           
          }),
          invalidatesTags: ['nativeLanguages'],
      }),

      // Иностранные языки
      getforeignLanguages: builder.query<foreignLanguageAll, void>({
        query: () => ({
          url: '/activities/languages/foreign',
          method: 'GET',
         
        }),
        providesTags: ['foreignLanguages'],
        keepUnusedDataFor: 1,
      }),
      getAllForeignLanguages: builder.query<any, void>({
        query: () => ({
          url: `/activities/languages/all?isForeign=true`,
          method: 'GET',
         
        }),
        providesTags: ['foreignLanguages'],
        keepUnusedDataFor: 1,
      }),
      getOneCertificate: builder.query<foreignLanguageAll, number | null>({
        query: (id) => ({
          url: `/activities/languages/foreign/certificate?certificateId=${id}`,
          method: 'GET',
          responseHandler: async (response) => {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'journal.xlsx'; // Имя файла для скачивания
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          },
        }),
       
        providesTags: ['foreignLanguages'],
        keepUnusedDataFor: 1,
      }),
      getLevels: builder.query<any, void>({
        query: () => ({
          url: '/activities/languages/levels',
          method: 'GET',
         
        }),
        providesTags: ['levelsLanguages'],
        keepUnusedDataFor: 1,
      }),
      getCertificate: builder.query<any, void>({
        query: () => ({
          url: '/activities/languages/certificate-names',
          method: 'GET',
         
        }),
        providesTags: ['certificateLanguages'],
        keepUnusedDataFor: 1,
      }),
      setForeign: builder.mutation<any, any>({
        query: (body) => ({
            url: '/activities/languages/foreign',
            method: 'POST',
            body,
           
          }),
          invalidatesTags: ['foreignLanguages'],
      }),
      editForeign: builder.mutation<any, any>({
        query: (body) => ({
            url: '/activities/languages/foreign',
            method: 'PUT',
            body,
           
          }),
          invalidatesTags: ['foreignLanguages'],
      }),
      deleteForeign: builder.mutation<any, any>({
        query: (id) => ({
            url: `/activities/languages/foreign?langId=${id}`,
            method: 'DELETE',
            
           
          }),
          invalidatesTags: ['foreignLanguages'],
      }),
      isPublished: builder.mutation<any, any>({
        query: (id) => ({
            url: `/activities/languages/foreign/is-published?langId=${id}`,
            method: 'PATCH',
        
           
          }),
          invalidatesTags: ['foreignLanguages'],
      }),


      // ОБщественная деятельность
      getSoc: builder.query<socActivity, void>({
        query: () => ({
          url: '/activities/social-activity',
          method: 'GET',
         
        }),
        providesTags: ['socialActivity'],
        keepUnusedDataFor: 1,
      }),
      putSoc: builder.mutation<socActivity, any>({
        query: (body) => ({
            url: '/activities/social-activity',
            method: 'PUT',
            body,
           
          }),
          invalidatesTags: ['socialActivity'],
      }),
      postSoc: builder.mutation<socActivity, any>({
        query: (body) => ({
            url: '/activities/social-activity',
            method: 'POST',
            body,
           
          }),
          invalidatesTags: ['socialActivity'],
      }),




      // Научная деятельность
      getAllForScientific: builder.query<any, void>({
        query: () => ({
          url: `/activities/scientific-activity/list`,
          method: 'GET',
         
        }),
        providesTags: ['scientific'],
        keepUnusedDataFor: 1,
      }),
      getScientificDirectors: builder.query<any, any>({
        query: (name) => ({
          url: `/activities/scientific-activity/scientific-directors/search?name=${name}`,
          method: 'GET',
         
        }),
        providesTags: ['scientific'],
        keepUnusedDataFor: 1,
      }),



    })  });


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
    useGetCheckboxQuery,
    useSetCheckboxMutation,
    useGetLevelsQuery,
    useGetCertificateQuery,
    useSetForeignMutation,
    useGetOneCertificateQuery,
    useEditForeignMutation,
    useDeleteForeignMutation,
    useLazyGetOneCertificateQuery,
    useIsPublishedMutation,
    useGetSocQuery,
    usePutSocMutation,
    usePostSocMutation,
    useGetAllForeignLanguagesQuery,
    useDeleteAvatarMutation,
    useGetAllForScientificQuery,
    useGetScientificDirectorsQuery
   } = myPracticeService;