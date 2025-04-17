import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { respondId: number } = { respondId: 0 }

const currentResponceSlice = createSlice({
	name: 'currentResponce',
	initialState,
	reducers: {
		setCurrentResponce: (state, action: PayloadAction<number>) => {
			state.respondId = action.payload
		}
	}
})

export const { setCurrentResponce } = currentResponceSlice.actions

export default currentResponceSlice.reducer
