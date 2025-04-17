import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { chatId: number } = { chatId: 0 }

const chatIdSlice = createSlice({
	name: 'chatdIdSlice',
	initialState,
	reducers: {
		setChatId: (state, action: PayloadAction<number>) => {
			state.chatId = action.payload
		}
	}
})

export const { setChatId } = chatIdSlice.actions

export default chatIdSlice.reducer
