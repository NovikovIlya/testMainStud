import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IFormState } from '../../../api/types'

const initialState: IFormState = {
	name: '',
	surName: '',
	patronymic: null,
	birthDay: null,
	gender: '',
	phoneNumber: '',
	country: 'Российская Федерация'
}

export const FormReducer = createSlice({
	name: 'Form',
	initialState,
	reducers: {
		nameSuccess: (state, action: PayloadAction<string>): IFormState => {
			return { ...state, name: action.payload }
		},
		surNameSuccess: (state, action: PayloadAction<string>): IFormState => {
			return { ...state, surName: action.payload }
		},
		patronymicSuccess: (state, action: PayloadAction<string>): IFormState => {
			return { ...state, patronymic: action.payload }
		},
		birthDaySuccess: (state, action: PayloadAction<string>): IFormState => {
			return { ...state, birthDay: action.payload }
		},
		genderSuccess: (state, action: PayloadAction<string>): IFormState => {
			return { ...state, gender: action.payload }
		},
		phoneNumberSuccess: (state, action: PayloadAction<string>): IFormState => {
			return { ...state, phoneNumber: action.payload }
		},
		countrySuccess: (state, action: PayloadAction<string>): IFormState => {
			return { ...state, country: action.payload }
		}
	}
})

export const {
	nameSuccess,
	surNameSuccess,
	patronymicSuccess,
	birthDaySuccess,
	genderSuccess,
	phoneNumberSuccess,
	countrySuccess
} = FormReducer.actions

export default FormReducer.reducer

export const selectState = (state: RootState) => state.Form
