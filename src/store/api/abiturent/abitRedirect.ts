import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Определение API-слоя с использованием RTK Query
export const abiturientApi = createApi({
  reducerPath: 'abiturientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://abiturient.kpfu.ru/entrant',
    prepareHeaders: (headers, { getState }) => {
      // Добавление заголовка для указания кодировки
      headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=windows-1251');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    submitForm: builder.mutation({
      query: (formData) => {
        // Преобразование formData в строку для отправки
        const encodedData = new URLSearchParams(formData).toString();

        return {
          url: '/abit_registration.kfuscript',
          method: 'POST',
          body: encodedData,
          responseHandler: (response) => response.text(),
        };
      },
    }),
  }),
});

// Экспорт методов для использования в компонентах
export const { useSubmitFormMutation } = abiturientApi;
