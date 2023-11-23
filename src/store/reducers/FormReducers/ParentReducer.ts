import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IParentState } from '../../../api/types'

const initialState: IParentState = {
	dateIssue: '',
	divisionCode: '',
	documentTypeId: 1,
	eMail: '',
	FIO: '',
	id: '0',
	inn: '',
	issuedBy: '',
	passportNumber: '',
	passportSeries: '',
	phone: '',
	registrationAddress: '',
	residenceAddress: '',
	snils: '',
	father: '',
	mother: ''
}

export const ParentReducer = createSlice({
	name: 'Parent',
	initialState: [initialState],
	reducers: {
		allData: (_, action: PayloadAction<IParentState[]>): IParentState[] => {
			return action.payload
		},
		deleteParent: (state, action: PayloadAction<string>) => {
			state = state.filter(e => e.id !== action.payload)
			return state
		},
		addParent: (state, action: PayloadAction<string>) => {
			state.push({ ...initialState, id: action.payload })
		},
		FIO: (state, action: PayloadAction<{ id: string; FIO: string }>) => {
			state.filter(el => el.id === action.payload.id)[0].FIO =
				action.payload.FIO
		},
		eMail: (state, action: PayloadAction<{ id: string; email: string }>) => {
			state.filter(el => el.id === action.payload.id)[0].eMail =
				action.payload.email
		},
		phone: (state, action: PayloadAction<{ id: string; phone: string }>) => {
			state.filter(el => el.id === action.payload.id)[0].phone =
				action.payload.phone
		},
		documentTypeId: (
			state,
			action: PayloadAction<{ id: string; documentTypeId: number }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].documentTypeId =
				action.payload.documentTypeId
		},
		divisionCode: (
			state,
			action: PayloadAction<{ id: string; divisionCode: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].divisionCode =
				action.payload.divisionCode
		},
		issuedBy: (
			state,
			action: PayloadAction<{ id: string; issuedBy: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].issuedBy =
				action.payload.issuedBy
		},
		passportSeries: (
			state,
			action: PayloadAction<{ id: string; passportSeries: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].passportSeries =
				action.payload.passportSeries
		},
		passportNumber: (
			state,
			action: PayloadAction<{ id: string; passportNumber: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].passportNumber =
				action.payload.passportNumber
		},
		dateIssue: (
			state,
			action: PayloadAction<{ id: string; dateIssue: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].dateIssue =
				action.payload.dateIssue
		},
		inn: (state, action: PayloadAction<{ id: string; inn: string }>) => {
			state.filter(el => el.id === action.payload.id)[0].inn =
				action.payload.inn
		},
		snils: (state, action: PayloadAction<{ id: string; snils: string }>) => {
			state.filter(el => el.id === action.payload.id)[0].snils =
				action.payload.snils
		},
		registrationAddress: (
			state,
			action: PayloadAction<{ id: string; registrationAddress: string }>
		) => {
			state.filter(el => el.id === action.payload.id)[0].registrationAddress =
				action.payload.registrationAddress
		},
		residenceAddress: (
			state,
			action: PayloadAction<{ id: string; residenceAddress: string }>
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
	allData,
	addParent,
	deleteParent
} = ParentReducer.actions

export default ParentReducer.reducer

export const selectState = (state: RootState) => state.Parent
