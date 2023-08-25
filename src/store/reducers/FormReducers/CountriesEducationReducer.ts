import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import {
	ICountriesDocumentsState,
	ICountryRequest,
	IEducationLevelRequest
} from '../../../api/types'

const initialState: ICountriesDocumentsState = {
	countries: null,
	educations: null
}

export const CountriesEducationReducer = createSlice({
	name: 'CountriesEducation',
	initialState,
	reducers: {
		addCountries: (state, action: PayloadAction<ICountryRequest[]>) => {
			state.countries = action.payload
		},
		addEducations: (state, action: PayloadAction<IEducationLevelRequest[]>) => {
			state.educations = action.payload
		}
	}
})

export const { addCountries, addEducations } = CountriesEducationReducer.actions

export default CountriesEducationReducer.reducer

export const selectState = (state: RootState) => state.CountriesEducation
