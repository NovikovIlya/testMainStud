import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'

import {
	IAuthReducerRequest,
	IAuthRegState,
	IError
} from '../../api/auth/types'
import { RootState } from '../index'

const cookies = new Cookies()

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
	name: 'AuthReg',
	initialState,
	reducers: {
		LogInSuccess: (
			state,
			action: PayloadAction<IAuthReducerRequest>
		): IAuthRegState => {
			localStorage.setItem('access', action.payload.accessToken)
			if (action.payload.refreshToken !== '') {
				cookies.set('refresh', action.payload.refreshToken)
			}
			return {
				...state,
				authData: {
					...state.authData,
					accessToken: action.payload.accessToken,
					error: null
				}
			}
		},
		RegistSuccess: (state, action: PayloadAction<string>) => {
			state.regData.error = null
		},
		LogInFailure: (state, action: PayloadAction<IError[]>): IAuthRegState => {
			return {
				...state,
				authData: {
					...state.authData,
					error: action.payload.length === 0 ? null : action.payload
				}
			}
		},
		RegistFailure: (state, action: PayloadAction<IError[]>): IAuthRegState => {
			return {
				...state,
				regData: {
					...state.regData,
					error: action.payload.length === 0 ? null : action.payload
				}
			}
		},
		LogOutSuccess: (): IAuthRegState => {
			cookies.remove('refresh')
			localStorage.removeItem('access')
			localStorage.removeItem('user_id')
			localStorage.removeItem('user_data')
			return initialState
		}
	}
})

export const {
	LogInFailure,
	LogInSuccess,
	RegistFailure,
	RegistSuccess,
	LogOutSuccess
} = AuthRegReducer.actions

export default AuthRegReducer.reducer

export const selectState = (state: RootState) => state.AuthReg
