import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { secondStageStatus: string } = { secondStageStatus: 'VERIFYING' }

const secondStageStatusSlice = createSlice( {
	name: 'secondStageStatus',
	initialState,
	reducers: {
		setSecondStageStatus: (state,action: PayloadAction<string>) => {
			state.secondStageStatus = action.payload
		}
	}
})

export const { setSecondStageStatus } = secondStageStatusSlice.actions

export default secondStageStatusSlice.reducer