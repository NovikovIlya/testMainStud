import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { requestId: number } = { requestId: 0 }

const CurrentRequestSlice = createSlice({
	name: 'CurrentRequestSlice',
	initialState,
	reducers: {
		setRequestId: (state, action: PayloadAction<number>) => {
			state.requestId = action.payload
		}
	}
})

export const { setRequestId } = CurrentRequestSlice.actions

export default CurrentRequestSlice.reducer
