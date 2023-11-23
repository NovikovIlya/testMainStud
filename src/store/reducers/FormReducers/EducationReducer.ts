import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IEducationState } from '../../../api/types'

const generalState = {
	id: '0',
	nameOfInstitute: '',
	educationLevelId: 4,
	documentNumber: '',
	documentSeries: '',
	countryId: 184,
	graduateYear: '',
	specialization: ''
}

const initialState: IEducationState[] = [generalState]

export const EducationReducer = createSlice({
	name: 'Education',
	initialState,
	reducers: {
		allData: (
			_,
			action: PayloadAction<IEducationState[]>
		): IEducationState[] => {
			return action.payload
		},
		idDelete: (state, action: PayloadAction<string>): IEducationState[] => {
			return state.filter(e => e.id !== action.payload)
		},
		addEducation: (state, action: PayloadAction<string>) => {
			state.push({ ...generalState, id: action.payload })
		},
		nameOfInstitute: (
			state,
			action: PayloadAction<{ id: string; nameOfInstitute: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].nameOfInstitute =
				action.payload.nameOfInstitute
		},
		educationLevelId: (
			state,
			action: PayloadAction<{ id: string; educationLevelId: number }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].educationLevelId =
				action.payload.educationLevelId
		},
		documentNumber: (
			state,
			action: PayloadAction<{ id: string; documentNumber: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].documentNumber =
				action.payload.documentNumber
		},
		documentSeries: (
			state,
			action: PayloadAction<{ id: string; documentSeries: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].documentSeries =
				action.payload.documentSeries
		},
		countryId: (
			state,
			action: PayloadAction<{ id: string; countryId: number }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].countryId =
				action.payload.countryId
		},
		graduateYear: (
			state,
			action: PayloadAction<{ id: string; graduateYear: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].graduateYear =
				action.payload.graduateYear
		},
		specialization: (
			state,
			action: PayloadAction<{ id: string; specialization: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].specialization =
				action.payload.specialization
		}
	}
})

export const {
	idDelete,
	addEducation,
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
