import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IEdForm, IEducationState } from '../../../api/types'

const generalState: IEdForm = {
	id: -1,
	nameOfInstitute: '',
	educationLevel: '',
	documentNumber: '',
	documentSeries: '',
	educationCountry: 'Российская Федерация'
}

const initialState: IEducationState = {
	educationItems: [{ ...generalState, id: 0 }]
}

export const EducationReducer = createSlice({
	name: 'Education',
	initialState,
	reducers: {
		idAdd: (state, action: PayloadAction<number>): IEducationState => {
			if (state.educationItems.length === 0) {
				return { educationItems: [{ ...generalState, id: action.payload }] }
			} else {
				return {
					...state,
					educationItems: [
						...state.educationItems,
						{ ...generalState, id: action.payload }
					]
				}
			}
		},
		idDelete: (state, action: PayloadAction<number>): IEducationState => {
			return {
				...state,
				educationItems: state.educationItems.filter(
					e => e.id !== action.payload
				)
			}
		},
		nameOfInstituteSuccess: (
			state,
			action: PayloadAction<{ id: number; nameOfInstitute: string }>
		): IEducationState => {
			return {
				...state,
				educationItems: state.educationItems.map(e => {
					if (e.id === action.payload.id) {
						return { ...e, nameOfInstitute: action.payload.nameOfInstitute }
					} else {
						return e
					}
				})
			}
		},
		educationLevelSuccess: (
			state,
			action: PayloadAction<{ id: number; educationLevel: string }>
		): IEducationState => {
			return {
				...state,
				educationItems: state.educationItems.map(e => {
					if (e.id === action.payload.id) {
						return { ...e, educationLevel: action.payload.educationLevel }
					} else {
						return e
					}
				})
			}
		},
		documentNumberSuccess: (
			state,
			action: PayloadAction<{ id: number; documentNumber: string }>
		): IEducationState => {
			return {
				...state,
				educationItems: state.educationItems.map(e => {
					if (e.id === action.payload.id) {
						return { ...e, documentNumber: action.payload.documentNumber }
					} else {
						return e
					}
				})
			}
		},
		documentSeriesSuccess: (
			state,
			action: PayloadAction<{ id: number; documentSeries: string }>
		): IEducationState => {
			return {
				...state,
				educationItems: state.educationItems.map(e => {
					if (e.id === action.payload.id) {
						return { ...e, documentSeries: action.payload.documentSeries }
					} else {
						return e
					}
				})
			}
		},
		educationCountrySeriesSuccess: (
			state,
			action: PayloadAction<{ id: number; educationCountry: string }>
		): IEducationState => {
			return {
				...state,
				educationItems: state.educationItems.map(e => {
					if (e.id === action.payload.id) {
						return { ...e, educationCountry: action.payload.educationCountry }
					} else {
						return e
					}
				})
			}
		}
	}
})

export const {
	idAdd,
	idDelete,
	nameOfInstituteSuccess,
	educationLevelSuccess,
	documentNumberSuccess,
	documentSeriesSuccess,
	educationCountrySeriesSuccess
} = EducationReducer.actions

export default EducationReducer.reducer

export const selectState = (state: RootState) => state.Education
