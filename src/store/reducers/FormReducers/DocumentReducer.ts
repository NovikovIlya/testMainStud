import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IDocument } from '../../../api/types'

const initialState: IDocument = {
	documentTypeId: null,
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
		allData: (state, action: PayloadAction<IDocument>) => {
			action.payload.dateIssue && (state.dateIssue = action.payload.dateIssue)
			action.payload.divisionCode &&
				(state.divisionCode = action.payload.divisionCode)
			action.payload.documentTypeId &&
				(state.documentTypeId = action.payload.documentTypeId)
			action.payload.inn && (state.inn = action.payload.inn)
			action.payload.issuedBy && (state.issuedBy = action.payload.issuedBy)
			action.payload.passportNumber &&
				(state.passportNumber = action.payload.passportNumber)
			action.payload.passportSeries &&
				(state.passportSeries = action.payload.passportSeries)
			action.payload.snils && (state.snils = action.payload.snils)
		},
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
	snils,
	allData
} = DocumentReducer.actions

export default DocumentReducer.reducer

export const selectState = (state: RootState) => state.Document
