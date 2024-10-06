import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { forthStageCommentVisibility: string } = { forthStageCommentVisibility: 'invisible' }

const forthStageCommentVisibilitySlice = createSlice( {
	name: 'forthStageCommentVisibility',
	initialState,
	reducers: {
		setForthStageCommentVisibility: (state,action: PayloadAction<string>) => {
			state.forthStageCommentVisibility = action.payload
		}
	}
})

export const { setForthStageCommentVisibility } = forthStageCommentVisibilitySlice.actions

export default forthStageCommentVisibilitySlice.reducer