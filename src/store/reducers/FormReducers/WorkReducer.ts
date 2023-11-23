import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IWorkState, workItem } from '../../../api/types'

const generalArray: workItem = {
	id: '0',
	name: '',
	startDate: '',
	endDate: null,
	responsibilities: '',
	additionalInfo: ''
}

const initialState: IWorkState = {
	items: [generalArray],
	portfolioLink: null
}

export const WorkReducer = createSlice({
	name: 'Work',
	initialState,
	reducers: {
		allData: (_, action: PayloadAction<IWorkState>): IWorkState => {
			return action.payload
		},
		addWork: (state, action: PayloadAction<string>) => {
			state.items.push({ ...generalArray, id: action.payload })
		},
		deleteWork: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(e => e.id !== action.payload)
		},
		name: (state, action: PayloadAction<{ id: string; name: string }>) => {
			state.items.filter(el => el.id === action.payload.id)[0].name =
				action.payload.name
		},
		portfolioLink: (state, action: PayloadAction<string>) => {
			state.portfolioLink = action.payload
		},
		responsibilities: (
			state,
			action: PayloadAction<{ id: string; responsibilities: string }>
		) => {
			state.items.filter(
				el => el.id === action.payload.id
			)[0].responsibilities = action.payload.responsibilities
		},
		additionalInfo: (
			state,
			action: PayloadAction<{ id: string; additionalInfo: string }>
		) => {
			state.items.filter(el => el.id === action.payload.id)[0].additionalInfo =
				action.payload.additionalInfo
		},
		startDate: (
			state,
			action: PayloadAction<{ id: string; startDate: string }>
		) => {
			state.items.filter(el => el.id === action.payload.id)[0].startDate =
				action.payload.startDate
		},
		endDate: (
			state,
			action: PayloadAction<{ id: string; endDate: string | null }>
		) => {
			state.items.filter(el => el.id === action.payload.id)[0].endDate =
				action.payload.endDate
		}
	}
})

export const {
	addWork,
	name,
	deleteWork,
	portfolioLink,
	responsibilities,
	additionalInfo,
	startDate,
	endDate,
	allData
} = WorkReducer.actions

export default WorkReducer.reducer
