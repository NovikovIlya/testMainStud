import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { id: number } = { id: 0 }

const currentInterviewSlice = createSlice({
	name: 'currentInterview',
	initialState,
	reducers: {
		setCurrentInterview: (state, action: PayloadAction<number>) => {
			state.id = action.payload
		}
	}
})

export const { setCurrentInterview } = currentInterviewSlice.actions

export default currentInterviewSlice.reducer
