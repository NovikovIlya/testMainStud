import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { timeFormated: string } = { timeFormated: '' }

const currentInterviewTimeFormatedSlice = createSlice({
	name: 'currentInterviewTimeFormated',
	initialState,
	reducers: {
		setCurrentInterviewTimeFormated: (state, action: PayloadAction<string>) => {
			state.timeFormated = action.payload
		}
	}
})

export const { setCurrentInterviewTimeFormated } = currentInterviewTimeFormatedSlice.actions

export default currentInterviewTimeFormatedSlice.reducer