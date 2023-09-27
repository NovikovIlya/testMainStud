import { RootState } from '..'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface InitialState {
	accessToken: string | null
	refreshToken: string | null
	user: User | null
}

export interface User {
	username: string
	firstname: string
	lastname: string
	middlename: string
	birthday: string
	phone: string
	email: string
	citizenship: string
	roles: Role[]
	sessionId: string
	sessionHash: string
	allId: string
}

export interface Role {
	login: string
	id: string
	type: string
}

const initialState: InitialState = {
	accessToken: localStorage.getItem('access'),
	refreshToken: localStorage.getItem('refresh'),
	user: JSON.parse(localStorage.getItem('user') || '{}')
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<InitialState>) => {
			state.accessToken = action.payload.accessToken
			state.refreshToken = action.payload.refreshToken
			if (state.user && action.payload.user)
				state.user.roles = [...action.payload.user.roles]
			state.user = action.payload.user
		},
		logOut: state => {
			state.user = null
			state.accessToken = null
			state.refreshToken = null
			localStorage.removeItem('refresh')
			localStorage.removeItem('user')
			localStorage.removeItem('access')
		}
	}
})

export const { logOut, setCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.accessToken
