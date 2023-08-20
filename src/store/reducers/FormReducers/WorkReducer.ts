import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IWorkState } from '../../../api/types'

const generalArray = {
	name: '',
	startDate: '',
	endDate: null,
	responsibilities: '',
	additionalInfo: ''
}

const initialState: IWorkState = {
	items: [{ ...generalArray, id: 0 }],
	portfolioLink: ''
}

export const WorkReducer = createSlice({
	name: 'Work',
	initialState,
	reducers: {
		idAdd: (state, action: PayloadAction<number>) => {
			state.items.push({ ...generalArray, id: action.payload })
		},
		idDelete: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(e => e.id !== action.payload)
		},
		name: (state, action: PayloadAction<{ id: number; name: string }>) => {
			state.items[action.payload.id].name = action.payload.name
		},
		portfolioLink: (state, action: PayloadAction<string>) => {
			state.portfolioLink = action.payload
		},
		responsibilities: (
			state,
			action: PayloadAction<{ id: number; responsibilities: string }>
		) => {
			state.items[action.payload.id].responsibilities =
				action.payload.responsibilities
		},
		additionalInfo: (
			state,
			action: PayloadAction<{ id: number; additionalInfo: string }>
		) => {
			state.items[action.payload.id].additionalInfo =
				action.payload.additionalInfo
		},
		startDate: (
			state,
			action: PayloadAction<{ id: number; startDate: string }>
		) => {
			state.items[action.payload.id].startDate = action.payload.startDate
		},
		endDate: (
			state,
			action: PayloadAction<{ id: number; endDate: string | null }>
		) => {
			state.items[action.payload.id].endDate = action.payload.endDate
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
	endDate
} = WorkReducer.actions

export default WorkReducer.reducer

export const selectState = (state: RootState) => state.Work
