import { createSlice } from '@reduxjs/toolkit'

const initialState: { chatClosed: boolean } = {
	chatClosed: false
}

const ChatRespondStatusSlice = createSlice({
	name: 'ChatRespondStatus',
	initialState,
	reducers: {
		closeChat: state => {
			state.chatClosed = true
		},
		openChat: state => {
			state.chatClosed = false
		}
	}
})

export const { closeChat, openChat } = ChatRespondStatusSlice.actions

export default ChatRespondStatusSlice.reducer
