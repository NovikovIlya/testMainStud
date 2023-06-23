import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
	IFormState,
	IdocumentsForm,
	IeducationForm,
	IinfoForm,
	roleType
} from '../../api/types'
import { RootState } from '../index'

const initialState: IFormState = {
	role: '',
	infoForm: {
		name: '',
		surName: '',
		patronymic: null,
		birthDay: '',
		gender: '',
		phoneNumber: '',
		country: ''
	},
	education: [],
	documents: {
		mainDocument: '',
		passwordSeries: null,
		passwordNumber: null,
		issuedBy: null,
		dateIssue: null,
		divisionCode: '',
		inn: '',
		snils: ''
	}
}

export const FormReducer = createSlice({
	name: 'Form',
	initialState,
	reducers: {
		infoUserSuccess: (state, action: PayloadAction<roleType>): IFormState => {
			return {
				...state,
				role: action.payload
			}
		},
		formSuccess: (state, action: PayloadAction<IinfoForm>): IFormState => ({
			...state,
			infoForm: action.payload.infoForm
		}),
		documentsSuccess: (
			state,
			action: PayloadAction<IdocumentsForm>
		): IFormState => ({
			...state,
			documents: action.payload.documents
		}),
		educationSuccess: (
			state,
			action: PayloadAction<IeducationForm>
		): IFormState => ({
			...state,
			education: action.payload.education
		}),
		changeDivisionCode(state, action: PayloadAction<string>) {
			state.documents.divisionCode = action.payload
		}
	}
})

export const {
	infoUserSuccess,
	formSuccess,
	documentsSuccess,
	educationSuccess,
	changeDivisionCode
} = FormReducer.actions

export default FormReducer.reducer

export const selectState = (state: RootState) => state.Form
