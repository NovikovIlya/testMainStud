import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Определение API-слоя с использованием RTK Query
export const studentPracticeApi = createApi({
  reducerPath: 'studentPracticeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newlk.kpfu.ru/',
    prepareHeaders: (headers, { getState }) => {
      // Добавление заголовка для указания кодировки
      headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=windows-1251');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPractice: builder.mutation({
        query: (body: FormData) => {
            return {
                url: 'services/api-practices/contracts',
                body: body,
                method: 'POST'
            }
        },
       
    }),
  }),
});

// Экспорт методов для использования в компонентах
export const { useCreatePracticeMutation } = studentPracticeApi;
