import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IDocumentState } from '../../../api/types'

const initialState: IDocumentState = {
	nameDocument: 'Паспорт РФ',
	passwordSeries: '',
	passwordNumber: '',
	issuedBy: '',
	dateIssue: null,
	divisionCode: '',
	inn: '',
	snils: ''
}

export const DocumentReducer = createSlice({
	name: 'Document',
	initialState,
	reducers: {
		nameDocument: (state, action: PayloadAction<string>) => {
			state.nameDocument = action.payload
		},
		passwordSeries: (state, action: PayloadAction<string>) => {
			state.passwordSeries = action.payload
		},
		passwordNumber: (state, action: PayloadAction<string>) => {
			state.passwordNumber = action.payload
		},
		issuedBy: (state, action: PayloadAction<string>) => {
			state.issuedBy = action.payload
		},
		dateIssue: (state, action: PayloadAction<string | null>) => {
			state.dateIssue = action.payload
		},
		divisionCode: (state, action: PayloadAction<string>) => {
			state.divisionCode = action.payload
		},
		inn: (state, action: PayloadAction<string>) => {
			state.inn = action.payload
		},
		snils: (state, action: PayloadAction<string>) => {
			state.snils = action.payload
		}
	}
})

export const {
	nameDocument,
	passwordSeries,
	passwordNumber,
	issuedBy,
	dateIssue,
	divisionCode,
	inn,
	snils
} = DocumentReducer.actions

export default DocumentReducer.reducer

export const selectState = (state: RootState) => state.Document
