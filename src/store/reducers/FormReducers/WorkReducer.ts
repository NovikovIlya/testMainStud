import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'

const generalArray = {
	id: 0,
	place: '',
	time: ''
}

const initialState = {
	workItems: [{ ...generalArray, id: 0 }],
	description: '',
	link: ''
}

export const WorkReducer = createSlice({
	name: 'Work',
	initialState,
	reducers: {
		idAdd: (state, action: PayloadAction<number>) => {
			state.workItems.push({ ...generalArray, id: action.payload })
		},
		idDelete: (state, action: PayloadAction<number>) => {
			state.workItems = state.workItems.filter(e => e.id !== action.payload)
		},
		description: (state, action: PayloadAction<string>) => {
			state.description = action.payload
		},
		link: (state, action: PayloadAction<string>) => {
			state.link = action.payload
		},
		place: (state, action: PayloadAction<{ id: number; place: string }>) => {
			state.workItems[action.payload.id].place = action.payload.place
		},
		time: (state, action: PayloadAction<{ id: number; time: string }>) => {
			state.workItems[action.payload.id].time = action.payload.time
		}
	}
})

export const { idAdd, idDelete, description, link, place, time } =
	WorkReducer.actions

export default WorkReducer.reducer

export const selectState = (state: RootState) => state.Work
