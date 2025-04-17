import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { sixStageCommentVisibility: string } = { sixStageCommentVisibility: 'invisible' }

const sixStageCommentVisibilitySlice = createSlice( {
	name: 'sixStageCommentVisibility',
	initialState,
	reducers: {
		setSixStageCommentVisibility: (state,action: PayloadAction<string>) => {
			state.sixStageCommentVisibility = action.payload
		}
	}
})

export const { setSixStageCommentVisibility } = sixStageCommentVisibilitySlice.actions

export default sixStageCommentVisibilitySlice.reducer