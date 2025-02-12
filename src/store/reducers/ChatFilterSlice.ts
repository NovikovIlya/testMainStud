import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type chatFilterType = 'IN_PERSONNEL_DEPT_REVIEW' | 'IN_RESERVE' | 'ARCHIVE'

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
