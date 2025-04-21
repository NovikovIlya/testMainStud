import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { secondStageCommentVisibility: string } = { secondStageCommentVisibility: 'invisible' }

const secondStageCommentVisibilitySlice = createSlice({
	name: 'secondStageCommentVisibility',
	initialState,
	reducers: {
		setSecondStageCommentVisibility: (state, action: PayloadAction<string>) => {
			state.secondStageCommentVisibility = action.payload
		}
	}
})

export const { setSecondStageCommentVisibility } = secondStageCommentVisibilitySlice.actions

export default secondStageCommentVisibilitySlice.reducer
