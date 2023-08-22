import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IParentState } from '../../../api/types'

const initialState: IParentState = {
	FIO: '',
	eMail: '',
	phone: '',
	documentTypeId: 1,
	divisionCode: '',
	issuedBy: '',
	passportSeries: '',
	passportNumber: '',
	dateIssue: '',
	inn: '',
	snils: '',
	registrationAddress: '',
	residenceAddress: ''
}

export const ParentReducer = createSlice({
	name: 'Parent',
	initialState,
	reducers: {
		FIO: (state, action: PayloadAction<string>) => {
			state.FIO = action.payload
		},
		eMail: (state, action: PayloadAction<string>) => {
			state.eMail = action.payload
		},
		phone: (state, action: PayloadAction<string>) => {
			state.phone = action.payload
		},
		documentTypeId: (state, action: PayloadAction<number>) => {
			state.documentTypeId = action.payload
		},
		divisionCode: (state, action: PayloadAction<string>) => {
			state.divisionCode = action.payload
		},
		issuedBy: (state, action: PayloadAction<string>) => {
			state.issuedBy = action.payload
		},
		passportSeries: (state, action: PayloadAction<string>) => {
			state.passportSeries = action.payload
		},
		passportNumber: (state, action: PayloadAction<string>) => {
			state.passportNumber = action.payload
		},
		dateIssue: (state, action: PayloadAction<string>) => {
			state.dateIssue = action.payload
		},
		inn: (state, action: PayloadAction<string>) => {
			state.inn = action.payload
		},
		snils: (state, action: PayloadAction<string>) => {
			state.snils = action.payload
		},
		registrationAddress: (state, action: PayloadAction<string>) => {
			state.registrationAddress = action.payload
		},
		residenceAddress: (state, action: PayloadAction<string>) => {
			state.residenceAddress = action.payload
		}
	}
})

export const {
	FIO,
	eMail,
	phone,
	documentTypeId,
	divisionCode,
	issuedBy,
	passportSeries,
	passportNumber,
	dateIssue,
	inn,
	snils,
	residenceAddress,
	registrationAddress
} = ParentReducer.actions

export default ParentReducer.reducer

export const selectState = (state: RootState) => state.Parent
