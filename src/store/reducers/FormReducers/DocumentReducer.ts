import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IDocumentState } from '../../../api/types'

const initialState: IDocumentState = {
	documentTypeId: 1,
	passportSeries: '',
	passportNumber: '',
	issuedBy: '',
	dateIssue: '',
	divisionCode: '',
	inn: '',
	snils: ''
}

export const DocumentReducer = createSlice({
	name: 'Document',
	initialState,
	reducers: {
		documentTypeId: (state, action: PayloadAction<number>) => {
			state.documentTypeId = action.payload
		},
		passportSeries: (state, action: PayloadAction<string>) => {
			state.passportSeries = action.payload
		},
		passportNumber: (state, action: PayloadAction<string>) => {
			state.passportNumber = action.payload
		},
		issuedBy: (state, action: PayloadAction<string>) => {
			state.issuedBy = action.payload
		},
		dateIssue: (state, action: PayloadAction<string>) => {
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
	documentTypeId,
	passportSeries,
	passportNumber,
	issuedBy,
	dateIssue,
	divisionCode,
	inn,
	snils
} = DocumentReducer.actions

export default DocumentReducer.reducer

export const selectState = (state: RootState) => state.Document
