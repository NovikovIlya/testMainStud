import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { forthStageStatus: string } = { forthStageStatus: 'VERIFYING' }

const forthStageStatusSlice = createSlice( {
	name: 'forthStageStatus',
	initialState,
	reducers: {
		setForthStageStatus: (state,action: PayloadAction<string>) => {
			state.forthStageStatus = action.payload
		}
	}
})

export const { setForthStageStatus } = forthStageStatusSlice.actions

export default forthStageStatusSlice.reducer