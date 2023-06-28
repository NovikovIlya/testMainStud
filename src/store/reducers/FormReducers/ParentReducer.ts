import { PayloadAction, createSlice } from '@reduxjs/toolkit';



import { RootState } from '../..';
import { IParentState } from '../../../api/types';


const initialState: IParentState = {
	FIO: '',
	eMail: '',
	phoneNumber: '',
	mainDocument: 'Паспорт РФ',
	divisionCode: '',
	issuedBy: null,
	passwordSeries: null,
	passwordNumber: null,
	dateIssue: null,
	inn: '',
	snils: '',
	registrationAddress: '',
	residenceAddress: ''
}

export const ParentReducer = createSlice({
	name: 'Parent',
	initialState,
	reducers: {
		FIOSuccess: (state, action: PayloadAction<string>): IParentState => {
			return {
				...state,
				FIO: action.payload
			}
		},
		eMailSuccess: (state, action: PayloadAction<string>): IParentState => {
			return {
				...state,
				eMail: action.payload
			}
		},
		phoneNumberSuccess: (
			state,
			action: PayloadAction<string>
		): IParentState => {
			return {
				...state,
				phoneNumber: action.payload
			}
		},
		mainDocumentSuccess: (
			state,
			action: PayloadAction<string>
		): IParentState => {
			return {
				...state,
				mainDocument: action.payload
			}
		},
		divisitonCodeSuccess: (
			state,
			action: PayloadAction<string>
		): IParentState => {
			return {
				...state,
				divisionCode: action.payload
			}
		},
		issuedBySuccess: (state, action: PayloadAction<string>): IParentState => {
			return {
				...state,
				issuedBy: action.payload
			}
		},
		passwordSeriesSuccess: (
			state,
			action: PayloadAction<string>
		): IParentState => {
			return {
				...state,
				passwordSeries: action.payload
			}
		},
		passwordNumberSuccess: (
			state,
			action: PayloadAction<string>
		): IParentState => {
			return {
				...state,
				passwordNumber: action.payload
			}
		},
		dateIssueSuccess: (state, action: PayloadAction<string>): IParentState => {
			return {
				...state,
				dateIssue: action.payload
			}
		},
		innSuccess: (state, action: PayloadAction<string>): IParentState => {
			return {
				...state,
				inn: action.payload
			}
		},
		snilsSuccess: (state, action: PayloadAction<string>): IParentState => {
			return {
				...state,
				snils: action.payload
			}
		},
		registrationAddressSuccess: (
			state,
			action: PayloadAction<string>
		): IParentState => {
			return {
				...state,
				registrationAddress: action.payload
			}
		},
		residenceAddressSuccess: (
			state,
			action: PayloadAction<string>
		): IParentState => {
			return {
				...state,
				residenceAddress: action.payload
			}
		}
	}
})

export const {
	FIOSuccess,
	eMailSuccess,
	phoneNumberSuccess,
	mainDocumentSuccess,
	divisitonCodeSuccess,
	issuedBySuccess,
	passwordSeriesSuccess,
	passwordNumberSuccess,
	dateIssueSuccess,
	innSuccess,
	snilsSuccess,
	residenceAddressSuccess,
	registrationAddressSuccess
} = ParentReducer.actions

export default ParentReducer.reducer

export const selectState = (state: RootState) => state.Parent