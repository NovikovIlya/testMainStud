import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { respondId: number } = { respondId: 0 }

const respondIdSlice = createSlice({
	name: 'chatdIdSlice',
	initialState,
	reducers: {
		setRespondId: (state, action: PayloadAction<number>) => {
			state.respondId = action.payload
		}
	}
})

export const { setRespondId } = respondIdSlice.actions

export default respondIdSlice.reducer
