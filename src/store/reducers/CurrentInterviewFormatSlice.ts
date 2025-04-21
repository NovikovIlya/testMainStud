import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { format: string } = { format: '' }

const currentInterviewFormatSlice = createSlice( {
	name: 'currentInterviewFormat',
	initialState,
	reducers: {
		setCurrentInterviewFormat: (state,action: PayloadAction<string>) => {
			state.format = action.payload
		}
	}
})

export const { setCurrentInterviewFormat } = currentInterviewFormatSlice.actions

export default currentInterviewFormatSlice.reducer
