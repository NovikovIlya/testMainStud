import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'

const generalState = {
	nameOfInstitute: '',
	educationLevel: '',
	documentNumber: '',
	documentSeries: '',
	educationCountry: 'Российская Федерация'
}

const initialState = [
	{
		id: 0,
		nameOfInstitute: '',
		educationLevel: '',
		documentNumber: '',
		documentSeries: '',
		educationCountry: 'Российская Федерация'
	}
]

export const EducationReducer = createSlice({
	name: 'Education',
	initialState,
	reducers: {
		idAdd: (state, action: PayloadAction<number>) => {
			state.push({ ...generalState, id: action.payload })
		},
		idDelete: (state, action: PayloadAction<number>) => {
			state = state.filter(e => e.id !== action.payload)
		},
		nameOfInstitute: (
			state,
			action: PayloadAction<{ id: number; nameOfInstitute: string }>
		) => {
			state[action.payload.id].nameOfInstitute = action.payload.nameOfInstitute
		},
		educationLevel: (
			state,
			action: PayloadAction<{ id: number; educationLevel: string }>
		) => {
			state[action.payload.id].educationLevel = action.payload.educationLevel
		},
		documentNumber: (
			state,
			action: PayloadAction<{ id: number; documentNumber: string }>
		) => {
			state[action.payload.id].documentNumber = action.payload.documentNumber
		},
		documentSeries: (
			state,
			action: PayloadAction<{ id: number; documentSeries: string }>
		) => {
			state[action.payload.id].documentSeries = action.payload.documentSeries
		},
		educationCountrySeries: (
			state,
			action: PayloadAction<{ id: number; educationCountry: string }>
		) => {
			state[action.payload.id].educationCountry =
				action.payload.educationCountry
		}
	}
})

export const {
	idAdd,
	idDelete,
	nameOfInstitute,
	educationLevel,
	documentNumber,
	documentSeries,
	educationCountrySeries
} = EducationReducer.actions

export default EducationReducer.reducer

export const selectState = (state: RootState) => state.Education
