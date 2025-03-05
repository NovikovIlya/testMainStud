import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { currentStage: string } = { currentStage: '' }

const employmentStage = createSlice({
	name: 'employmentStage',
	initialState,
	reducers: {
		setStage: (state, action: PayloadAction<string>) => {
			state.currentStage = action.payload
		}
	}
})

export const { setStage } = employmentStage.actions

export default employmentStage.reducer
