import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { sixStageStatusPersonnel: string } = { sixStageStatusPersonnel: 'VERIFYING' }

const sixStageStatusPersonnelSlice = createSlice( {
	name: 'sixStageStatusPersonnel',
	initialState,
	reducers: {
		setSixStageStatusPersonnel: (state,action: PayloadAction<string>) => {
			state.sixStageStatusPersonnel = action.payload
		}
	}
})

export const { setSixStageStatusPersonnel } = sixStageStatusPersonnelSlice.actions

export default sixStageStatusPersonnelSlice.reducer