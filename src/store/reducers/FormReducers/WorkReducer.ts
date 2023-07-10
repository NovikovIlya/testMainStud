import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IWorkArray, IWorkState } from '../../../api/types'

const generalArray: IWorkArray = {
	id: -1,
	place: '',
	time: ''
}

const initialState: IWorkState = {
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
		idDelete: (state, action: PayloadAction<number>): IWorkState => {
			return {
				...state,
				workItems: state.workItems.filter(e => e.id !== action.payload)
			}
		},
		descriptionSuccess: (state, action: PayloadAction<string>): IWorkState => {
			return {
				...state,
				description: action.payload
			}
		},
		linkSuccess: (state, action: PayloadAction<string>): IWorkState => {
			return {
				...state,
				link: action.payload
			}
		},
		placeSuccess: (
			state,
			action: PayloadAction<{ id: number; place: string }>
		): IWorkState => {
			return {
				...state,
				workItems: state.workItems.map(e => {
					if (e.id === action.payload.id) {
						return { ...e, place: action.payload.place }
					} else {
						return e
					}
				})
			}
		},
		timeSuccess: (
			state,
			action: PayloadAction<{ id: number; time: string }>
		): IWorkState => {
			return {
				...state,
				workItems: state.workItems.map(e => {
					if (e.id === action.payload.id) {
						return { ...e, time: action.payload.time }
					} else {
						return e
					}
				})
			}
		}
	}
})

export const {
	idAdd,
	idDelete,
	descriptionSuccess,
	linkSuccess,
	placeSuccess,
	timeSuccess
} = WorkReducer.actions

export default WorkReducer.reducer

export const selectState = (state: RootState) => state.Work
