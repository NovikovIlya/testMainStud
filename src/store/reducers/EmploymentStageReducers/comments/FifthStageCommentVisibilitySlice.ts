import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { fifthStageCommentVisibility: string } = { fifthStageCommentVisibility: 'invisible' }

const fifthStageCommentVisibilitySlice = createSlice( {
	name: 'fifthStageCommentVisibility',
	initialState,
	reducers: {
		setFifthStageCommentVisibility: (state,action: PayloadAction<string>) => {
			state.fifthStageCommentVisibility = action.payload
		}
	}
})

export const { setFifthStageCommentVisibility } = fifthStageCommentVisibilitySlice.actions

export default fifthStageCommentVisibilitySlice.reducer