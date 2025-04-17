import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { fifthStageStatus: string } = { fifthStageStatus: 'VERIFYING' }

const fifthStageStatusSlice = createSlice( {
	name: 'fifthStageStatus',
	initialState,
	reducers: {
		setFifthStageStatus: (state,action: PayloadAction<string>) => {
			state.fifthStageStatus = action.payload
		}
	}
})

export const { setFifthStageStatus } = fifthStageStatusSlice.actions

export default fifthStageStatusSlice.reducer