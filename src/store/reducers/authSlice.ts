import { RootState } from '..'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { InitialState } from './type'

const initialState: InitialState = {
	accessToken: localStorage.getItem('access'),
	refreshToken: localStorage.getItem('refresh'),
	user: JSON.parse(localStorage.getItem('user') || '{}'),
	edit: false,
	subRole: '',
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<InitialState>) => {
			state.accessToken = action.payload.accessToken
			localStorage.setItem('access', action.payload.accessToken || '')
			if (action.payload.refreshToken)
				state.refreshToken = action.payload.refreshToken
			if (state.user && action.payload.user)
				state.user.roles = [...action.payload.user.roles]
			if (action.payload.user) state.user = action.payload.user
		},
		logOut: state => {
			state.user = null
			state.accessToken = null
			state.refreshToken = null
			localStorage.removeItem('user')
			localStorage.removeItem('access')
			localStorage.removeItem('refresh')
			localStorage.removeItem('practice') //удаляю возможность зайти на сервис практки с аккаунта без доступа
			localStorage.removeItem('dashboard')
			localStorage.removeItem('subRole')
			localStorage.removeItem('typeAcc')
			localStorage.removeItem('password')
			localStorage.removeItem('acceptedData')
	
			
			// localStorage.clear()
		},
		setEdit: state => {
			state.edit = !state.edit
		},
		setRole: (state, action: PayloadAction<string>) => {
			if (state.user) state.user.roles[0].type = action.payload
		},
		setSubRole: (state, action: PayloadAction<string>) => {
			state.subRole = action.payload
		}
	}
})

export const { logOut, setCredentials, setEdit, setRole,setSubRole } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.accessToken
