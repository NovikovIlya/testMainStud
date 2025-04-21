import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { sixStageStatus: string } = { sixStageStatus: 'VERIFYING' }

const sixStageStatusSlice = createSlice( {
	name: 'sixStageStatus',
	initialState,
	reducers: {
		setSixStageStatus: (state,action: PayloadAction<string>) => {
			state.sixStageStatus = action.payload
		}
	}
})

export const { setSixStageStatus } = sixStageStatusSlice.actions

export default sixStageStatusSlice.reducer