import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { currentStage: number } = { currentStage: 0 }

const employmentStage = createSlice({
	name: 'employmentStage',
	initialState,
	reducers: {
		setStage: (state, action: PayloadAction<number>) => {
			state.currentStage = action.payload
		}
	}
})

export const { setStage } = employmentStage.actions

export default employmentStage.reducer
