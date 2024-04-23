import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import {
	ICountriesDocumentsState,
	ICountryRequest,
	IEducationLevelRequest
} from '../../../api/types'
import { IDocumentsRequest } from '../../types/type'

const initialState: ICountriesDocumentsState = {
	countries: null,
	educations: null,
	documents: null
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
		},
		addDocuments: (state, action: PayloadAction<IDocumentsRequest[]>) => {
			state.documents = action.payload
		}
	}
})

export const { addCountries, addEducations, addDocuments } =
	CountriesEducationReducer.actions

export default CountriesEducationReducer.reducer

export const selectState = (state: RootState) => state.CountriesEducation
