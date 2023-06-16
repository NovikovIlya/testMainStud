import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
	IFormState,
	IdocumentsForm,
	IeducationForm,
	IinfoForm
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
	education: {
		nameOfInstitute: '',
		educationLevel: '',
		documentNumber: '',
		documentSeries: '',
		educationCountry: ''
	},
	documents: {
		mainDocument: '',
		passwordSeries: null,
		passwordNumber: null,
		issuedBy: null,
		dateIssue: null,
		divisionCode: null,
		inn: '',
		snils: ''
	}
}

export const FormReducer = createSlice({
	name: 'Form',
	initialState,
	reducers: {
		infoUserSuccess: (state, action: PayloadAction<string>): IFormState => {
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
		})
	}
})

export const {
	infoUserSuccess,
	formSuccess,
	documentsSuccess,
	educationSuccess
} = FormReducer.actions

export default FormReducer.reducer

export const selectState = (state: RootState) => state.Form
