import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { stageStatus: string } = { stageStatus: 'VERIFYING' }

const currentStageStatusSlice = createSlice( {
	name: 'currentStageStatus',
	initialState,
	reducers: {
		setCurrentStageStatus: (state,action: PayloadAction<string>) => {
			state.stageStatus = action.payload
		}
	}
})

export const { setCurrentStageStatus } = currentStageStatusSlice.actions

export default currentStageStatusSlice.reducer