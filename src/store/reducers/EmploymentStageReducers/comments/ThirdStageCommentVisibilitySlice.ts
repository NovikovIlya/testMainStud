import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { thirdStageCommentVisibility: string } = { thirdStageCommentVisibility: 'invisible' }

const thirdStageCommentVisibilitySlice = createSlice( {
	name: 'thirdStageCommentVisibility',
	initialState,
	reducers: {
		setThirdStageCommentVisibility: (state,action: PayloadAction<string>) => {
			state.thirdStageCommentVisibility = action.payload
		}
	}
})

export const { setThirdStageCommentVisibility } = thirdStageCommentVisibilitySlice.actions

export default thirdStageCommentVisibilitySlice.reducer