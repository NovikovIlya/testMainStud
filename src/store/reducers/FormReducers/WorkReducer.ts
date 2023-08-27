import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IWorkState, workItem } from '../../../api/types'

const generalArray: workItem = {
	name: '',
	startDate: '',
	endDate: null,
	responsibilities: null,
	additionalInfo: ''
}

const initialState: IWorkState = {
	items: [{ ...generalArray, id: 0 }],
	portfolioLink: null
}

export const WorkReducer = createSlice({
	name: 'Work',
	initialState,
	reducers: {
		allData: (state, action: PayloadAction<IWorkState>): IWorkState => {
			return action.payload
		},
		idAdd: (state, action: PayloadAction<number>) => {
			state.items.push({ ...generalArray, id: action.payload })
		},
		idDelete: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(e => e.id !== action.payload)
		},
		name: (state, action: PayloadAction<{ id: number; name: string }>) => {
			state.items.filter(el => el.id === action.payload.id)[0].name =
				action.payload.name
		},
		portfolioLink: (state, action: PayloadAction<string>) => {
			state.portfolioLink = action.payload
		},
		responsibilities: (
			state,
			action: PayloadAction<{ id: number; responsibilities: string }>
		) => {
			state.items.filter(
				el => el.id === action.payload.id
			)[0].responsibilities = action.payload.responsibilities
		},
		additionalInfo: (
			state,
			action: PayloadAction<{ id: number; additionalInfo: string }>
		) => {
			state.items.filter(el => el.id === action.payload.id)[0].additionalInfo =
				action.payload.additionalInfo
		},
		startDate: (
			state,
			action: PayloadAction<{ id: number; startDate: string }>
		) => {
			state.items.filter(el => el.id === action.payload.id)[0].startDate =
				action.payload.startDate
		},
		endDate: (
			state,
			action: PayloadAction<{ id: number; endDate: string | null }>
		) => {
			state.items.filter(el => el.id === action.payload.id)[0].endDate =
				action.payload.endDate
		}
	}
})

export const {
	idAdd,
	name,
	idDelete,
	portfolioLink,
	responsibilities,
	additionalInfo,
	startDate,
	endDate,
	allData
} = WorkReducer.actions

export default WorkReducer.reducer

export const selectState = (state: RootState) => state.Work
