import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { time: string } = { time: '' }

const currentInterviewTimeSlice = createSlice({
	name: 'currentInterviewFormat',
	initialState,
	reducers: {
		setCurrentInterviewTime: (state, action: PayloadAction<string>) => {
			state.time = action.payload
		}
	}
})

export const { setCurrentInterviewTime } = currentInterviewTimeSlice.actions

export default currentInterviewTimeSlice.reducer