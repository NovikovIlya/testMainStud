import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IEducationState } from '../../../api/types'

const generalState = {
	id: 0,
	nameOfInstitute: '',
	educationLevelId: 1,
	documentNumber: '',
	documentSeries: '',
	countryId: 1,
	graduateYear: '',
	specialization: ''
}

const initialState: IEducationState[] = [generalState]

export const EducationReducer = createSlice({
	name: 'Education',
	initialState,
	reducers: {
		idAdd: (state, action: PayloadAction<number>) => {
			state.push({ ...generalState, id: action.payload })
		},
		idDelete: (state, action: PayloadAction<number>): IEducationState[] => {
			return state.filter(e => e.id !== action.payload)
		},
		nameOfInstitute: (
			state,
			action: PayloadAction<{ id: number; nameOfInstitute: string }>
		) => {
			state[action.payload.id].nameOfInstitute = action.payload.nameOfInstitute
		},
		educationLevelId: (
			state,
			action: PayloadAction<{ id: number; educationLevelId: number }>
		) => {
			state[action.payload.id].educationLevelId =
				action.payload.educationLevelId
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
		countryId: (
			state,
			action: PayloadAction<{ id: number; countryId: number }>
		) => {
			state[action.payload.id].countryId = action.payload.countryId
		},
		graduateYear: (
			state,
			action: PayloadAction<{ id: number; graduateYear: string }>
		) => {
			state[action.payload.id].graduateYear = action.payload.graduateYear
		},
		specialization: (
			state,
			action: PayloadAction<{ id: number; specialization: string }>
		) => {
			state[action.payload.id].specialization = action.payload.specialization
		}
	}
})

export const {
	idAdd,
	idDelete,
	nameOfInstitute,
	educationLevelId,
	documentNumber,
	documentSeries,
	countryId,
	graduateYear,
	specialization
} = EducationReducer.actions

export default EducationReducer.reducer

export const selectState = (state: RootState) => state.Education
