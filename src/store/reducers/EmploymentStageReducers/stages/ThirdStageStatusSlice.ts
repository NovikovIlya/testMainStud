import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { thirdStageStatus: string } = { thirdStageStatus: 'VERIFYING' }

const thirdStageStatusSlice = createSlice( {
	name: 'thirdStageStatus',
	initialState,
	reducers: {
		setThirdStageStatus: (state,action: PayloadAction<string>) => {
			state.thirdStageStatus = action.payload
		}
	}
})

export const { setThirdStageStatus } = thirdStageStatusSlice.actions

export default thirdStageStatusSlice.reducer