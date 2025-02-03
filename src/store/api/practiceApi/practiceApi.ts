import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import i18next from 'i18next'

const baseQuery = fetchBaseQuery({
	// baseUrl: 'http://localhost:8080/',
	baseUrl: 'https://newlk.kpfu.ru/',
	prepareHeaders(headers, { getState }) {
		headers.set('Accept-Language', i18next.language)
		return headers
	}
})

export const practiceApi = createApi({
	reducerPath: 'practiceApi',
	tagTypes: ['Tasks', 'Contracts', 'Practice'],
	baseQuery: baseQuery,
	endpoints: () => ({})
})
