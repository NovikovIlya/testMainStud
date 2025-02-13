import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type chatFilterType =
	| 'IN_PERSONNEL_DEPT_REVIEW'
	| 'IN_RESERVE'
	| 'ARCHIVE'
	| 'IN_SUPERVISOR_REVIEW'
	| 'INVITATION'
	| 'EMPLOYMENT'

const initialState: { filter: chatFilterType } = { filter: 'IN_PERSONNEL_DEPT_REVIEW' }

const chatFilterSlice = createSlice({
	name: 'chatFilterSlice',
	initialState,
	reducers: {
		setChatFilter: (state, action: PayloadAction<chatFilterType>) => {
			state.filter = action.payload
		}
	}
})

export const { setChatFilter } = chatFilterSlice.actions

export default chatFilterSlice.reducer
