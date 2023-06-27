import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IeducationState, edForm } from '../../../api/types'

const generalState: edForm = {
	id: -1,
	nameOfInstitute: '',
	educationLevel: '',
	documentNumber: '',
	documentSeries: '',
	educationCountry: 'Российская Федерация'
}

const initialState: IeducationState = {
	educationItems: [{ ...generalState, id: 0 }]
}

export const EducationReducer = createSlice({
	name: 'Education',
	initialState,
	reducers: {
		idAdd: (state, action: PayloadAction<number>): IeducationState => {
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
		idDelete: (state, action: PayloadAction<number>): IeducationState => {
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
		): IeducationState => {
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
		): IeducationState => {
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
		): IeducationState => {
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
		): IeducationState => {
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
		): IeducationState => {
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
