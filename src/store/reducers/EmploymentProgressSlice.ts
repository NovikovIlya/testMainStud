import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { EmployementStatus } from './type'

const initialState: { stages: { type: string; status: EmployementStatus }[] } = {
	stages: []
}

const EmploymentProgessSlice = createSlice({
	name: 'employmentProgess',
	initialState,
	reducers: {
		setAllProgress: (state, action: PayloadAction<{ type: string; status: EmployementStatus }[]>) => {
			state.stages = action.payload
		},
		setStageProgressAsFilling: (state, action: PayloadAction<string>) => {
			state.stages = state.stages.map(stage =>
				stage.type === action.payload ? { ...stage, status: 'FILLING' } : stage
			)
		},
		setStageProgressAsReady: (state, action: PayloadAction<string>) => {
			state.stages = state.stages.map(stage => (stage.type === action.payload ? { ...stage, status: 'READY' } : stage))
		}
	}
})

export const { setAllProgress, setStageProgressAsFilling, setStageProgressAsReady } = EmploymentProgessSlice.actions

export default EmploymentProgessSlice.reducer
