import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import endpoints from '../../api/endpoints'

import { ICountryRequest } from './../../api/types'

export const countriesAPi = createApi({
	reducerPath: 'countriesAPi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.63.96:8080/api' }),
	endpoints: build => ({
		getCountries: build.query<ICountryRequest[], string>({
			query: language => ({
				url: endpoints.USER.COUNTRIES,
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'Accept-Language': language
				}
			})
		})
	})
})

export const { useGetCountriesQuery } = countriesAPi
