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
		allData: (
			state,
			action: PayloadAction<IEducationState[]>
		): IEducationState[] => {
			return action.payload
		},
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
			state.filter(el => el.id === action.payload.id)[0].nameOfInstitute =
				action.payload.nameOfInstitute
		},
		educationLevelId: (
			state,
			action: PayloadAction<{ id: number; educationLevelId: number }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].educationLevelId =
				action.payload.educationLevelId
		},
		documentNumber: (
			state,
			action: PayloadAction<{ id: number; documentNumber: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].documentNumber =
				action.payload.documentNumber
		},
		documentSeries: (
			state,
			action: PayloadAction<{ id: number; documentSeries: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].documentSeries =
				action.payload.documentSeries
		},
		countryId: (
			state,
			action: PayloadAction<{ id: number; countryId: number }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].countryId =
				action.payload.countryId
		},
		graduateYear: (
			state,
			action: PayloadAction<{ id: number; graduateYear: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].graduateYear =
				action.payload.graduateYear
		},
		specialization: (
			state,
			action: PayloadAction<{ id: number; specialization: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].specialization =
				action.payload.specialization
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
	specialization,
	allData
} = EducationReducer.actions

export default EducationReducer.reducer

export const selectState = (state: RootState) => state.Education
