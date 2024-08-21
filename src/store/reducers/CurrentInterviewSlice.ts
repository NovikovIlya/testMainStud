import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { InterviewViewResponseType } from './type'

const initialState: { currentInterview: InterviewViewResponseType | null } = {
	currentInterview: null
}

const currentInterviewSlice = createSlice({
	name: 'currentInterview',
	initialState,
	reducers: {
		setCurrentInterview(
			state,
			action: PayloadAction<InterviewViewResponseType | null>
		) {
			state.currentInterview = action.payload
		}
	}
})

export const { setCurrentInterview } = currentInterviewSlice.actions

export default currentInterviewSlice.reducer