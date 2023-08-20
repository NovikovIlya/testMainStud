import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'

import { IAuthRegState, IAuthSuccess, IError } from '../../api/types'
import { RootState } from '../index'

const cookies = new Cookies()

interface IloginSuccess extends Omit<IAuthSuccess, 'user'> {}

const initialState: IAuthRegState = {
	authData: {
		accessToken: null,
		error: null
	},
	regData: {
		error: null
	}
}

export const AuthRegReducer = createSlice({
	name: 'AuthRegReducer',
	initialState,
	reducers: {
		loginSuccess: (state, action: PayloadAction<IloginSuccess>) => {
			localStorage.setItem('access', action.payload.accessToken)
			cookies.set('refresh', action.payload.refreshToken)
			state.authData.accessToken = action.payload.accessToken
			state.authData.error = null
		},
		refreshSuccess: (state, action: PayloadAction<string>) => {
			state.authData.accessToken = action.payload
		},
		loginFailure: (state, action: PayloadAction<IError | null>) => {
			state.authData.error = action.payload
		},
		registrationFailure: (state, action: PayloadAction<IError | null>) => {
			state.regData.error = action.payload
		},
		logoutSuccess: (): IAuthRegState => {
			cookies.remove('refresh')
			localStorage.removeItem('access')
			localStorage.removeItem('userInfo')
			return initialState
		}
	}
})

export const {
	loginFailure,
	loginSuccess,
	registrationFailure,
	logoutSuccess,
	refreshSuccess
} = AuthRegReducer.actions

export default AuthRegReducer.reducer

export const selectState = (state: RootState) => state.AuthReg
