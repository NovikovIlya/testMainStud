import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { visibility: string } = { visibility: 'invisible' }

const currentCommentVisibilitySlice = createSlice({
	name: 'currentCommentVisibility',
	initialState,
	reducers: {
		setCurrentCommentVisibility: (state, action: PayloadAction<string>) => {
			state.visibility = action.payload
		}
	}
})

export const { setCurrentCommentVisibility } = currentCommentVisibilitySlice.actions

export default currentCommentVisibilitySlice.reducer
