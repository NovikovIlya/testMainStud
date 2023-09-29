import { ICountryRequest, IEducationLevelRequest } from '../../api/types'

import { apiSlice } from './apiSlice'

export const utilsApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getCountries: build.query<ICountryRequest[], string>({
			query: language => ({
				url: 'user-api/country',
				headers: {
					'Accept-Language': language
				}
			})
		}),
		getEducationLevel: build.query<IEducationLevelRequest[], string>({
			query: language => ({
				url: 'user-api/education/levels',
				headers: {
					'Accept-Language': language
				}
			})
		})
	})
})

export const { useGetCountriesQuery, useGetEducationLevelQuery } = utilsApi
