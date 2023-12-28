import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { block } from '../../components/dnd/constant'

const initialState: ReactGridLayout.Layouts = localStorage.getItem('dashboard')
	? JSON.parse(localStorage.getItem('dashboard') || '')
	: block

export const LayoutSlice = createSlice({
	name: 'Layout',
	initialState,
	reducers: {
		removeCard: (state, action: PayloadAction<string>) => {
			state.lg = state.lg.filter(item => item.i !== action.payload)
		},
		addCard: (state, action) => {
			state.lg.push(action.payload)
		},
		changeLayout: (_, action) => action.payload
	}
})

export const { changeLayout, removeCard, addCard } = LayoutSlice.actions

export default LayoutSlice.reducer
