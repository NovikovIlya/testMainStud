import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IParentState } from '../../../api/types'

const initialState: IParentState[] = []

export const ParentReducer = createSlice({
	name: 'Parent',
	initialState,
	reducers: {
		allData: (state, action: PayloadAction<IParentState[]>): IParentState[] => {
			return action.payload
		},
		FIO: (state, action: PayloadAction<{ id: number; FIO: string }>) => {
			state.filter(el => el.id === action.payload.id)[0].FIO =
				action.payload.FIO
		},
		eMail: (state, action: PayloadAction<{ id: number; email: string }>) => {
			state.filter(el => el.id === action.payload.id)[0].eMail =
				action.payload.email
		},
		phone: (state, action: PayloadAction<{ id: number; phone: string }>) => {
			state.filter(el => el.id === action.payload.id)[0].phone =
				action.payload.phone
		},
		documentTypeId: (
			state,
			action: PayloadAction<{ id: number; documentTypeId: number }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].documentTypeId =
				action.payload.documentTypeId
		},
		divisionCode: (
			state,
			action: PayloadAction<{ id: number; divisionCode: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].divisionCode =
				action.payload.divisionCode
		},
		issuedBy: (
			state,
			action: PayloadAction<{ id: number; issuedBy: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].issuedBy =
				action.payload.issuedBy
		},
		passportSeries: (
			state,
			action: PayloadAction<{ id: number; passportSeries: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].passportSeries =
				action.payload.passportSeries
		},
		passportNumber: (
			state,
			action: PayloadAction<{ id: number; passportNumber: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].passportNumber =
				action.payload.passportNumber
		},
		dateIssue: (
			state,
			action: PayloadAction<{ id: number; dateIssue: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].dateIssue =
				action.payload.dateIssue
		},
		inn: (state, action: PayloadAction<{ id: number; inn: string }>) => {
			state.filter(el => el.id === action.payload.id)[0].inn =
				action.payload.inn
		},
		snils: (state, action: PayloadAction<{ id: number; snils: string }>) => {
			state.filter(el => el.id === action.payload.id)[0].snils =
				action.payload.snils
		},
		registrationAddress: (
			state,
			action: PayloadAction<{ id: number; registrationAddress: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].registrationAddress =
				action.payload.registrationAddress
		},
		residenceAddress: (
			state,
			action: PayloadAction<{ id: number; residenceAddress: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].residenceAddress =
				action.payload.residenceAddress
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
	registrationAddress,
	allData
} = ParentReducer.actions

export default ParentReducer.reducer

export const selectState = (state: RootState) => state.Parent
