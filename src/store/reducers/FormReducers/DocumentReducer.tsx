import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IDocumentState } from '../../../api/types'

const initialState: IDocumentState = {
	mainDocument: 'Паспорт РФ',
	passwordSeries: null,
	passwordNumber: null,
	issuedBy: null,
	dateIssue: null,
	divisionCode: '',
	inn: '',
	snils: ''
}

export const DocumentReducer = createSlice({
	name: 'Document',
	initialState,
	reducers: {
		mainDocumentSuccess: (
			state,
			action: PayloadAction<string>
		): IDocumentState => {
			return { ...state, mainDocument: action.payload }
		},
		passwordSeriesSuccess: (
			state,
			action: PayloadAction<string>
		): IDocumentState => {
			return { ...state, passwordSeries: action.payload }
		},
		passwordNumberSuccess: (
			state,
			action: PayloadAction<string>
		): IDocumentState => {
			return { ...state, passwordNumber: action.payload }
		},
		issuedBySuccess: (state, action: PayloadAction<string>): IDocumentState => {
			return { ...state, issuedBy: action.payload }
		},
		dateIssueSuccess: (
			state,
			action: PayloadAction<string>
		): IDocumentState => {
			return { ...state, dateIssue: action.payload }
		},
		divisionCodeSuccess: (
			state,
			action: PayloadAction<string>
		): IDocumentState => {
			return { ...state, divisionCode: action.payload }
		},
		innSuccess: (state, action: PayloadAction<string>): IDocumentState => {
			return { ...state, inn: action.payload }
		},
		snilsSuccess: (state, action: PayloadAction<string>): IDocumentState => {
			return { ...state, snils: action.payload }
		}
	}
})

export const {
	mainDocumentSuccess,
	passwordSeriesSuccess,
	passwordNumberSuccess,
	issuedBySuccess,
	dateIssueSuccess,
	divisionCodeSuccess,
	innSuccess,
	snilsSuccess
} = DocumentReducer.actions

export default DocumentReducer.reducer

export const selectState = (state: RootState) => state.Document
