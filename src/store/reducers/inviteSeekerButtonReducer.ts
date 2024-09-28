import { createSlice } from '@reduxjs/toolkit'

const initialState: { isDisabled: boolean } = {
	isDisabled: false
}

const inviteSeekerButtonReducer = createSlice({
	name: 'inviteSeekerButton',
	initialState,
	reducers: {
		disableButton(state) {
			state.isDisabled = true
		},
		enableButton(state) {
			state.isDisabled = false
		}
	}
})

export const { disableButton, enableButton } = inviteSeekerButtonReducer.actions

export default inviteSeekerButtonReducer.reducer
