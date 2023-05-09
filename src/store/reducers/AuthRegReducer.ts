import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'

import { IAuthReducerRequest, IAuthRegState, IError } from '../../api/types'
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
		loginSuccess: (
			state,
			action: PayloadAction<IAuthReducerRequest>
		): IAuthRegState => {
			localStorage.setItem('access', action.payload.accessToken)
			cookies.set('refresh', action.payload.refreshToken)
			return {
				...state,
				authData: {
					...state.authData,
					accessToken: action.payload.accessToken,
					error: null
				}
			}
		},
		refreshSuccess: (state, action: PayloadAction<string>): IAuthRegState => {
			return {
				...state,
				authData: {
					...state.authData,
					accessToken: action.payload
				}
			}
		},
		registrationSuccess: state => {
			state.regData.error = null
		},
		loginFailure: (state, action: PayloadAction<IError[]>): IAuthRegState => {
			return {
				...state,
				authData: {
					...state.authData,
					error: action.payload.length === 0 ? null : action.payload
				}
			}
		},
		registrationFailure: (
			state,
			action: PayloadAction<IError[]>
		): IAuthRegState => {
			return {
				...state,
				regData: {
					...state.regData,
					error: action.payload.length === 0 ? null : action.payload
				}
			}
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
	registrationSuccess,
	logoutSuccess,
	refreshSuccess
} = AuthRegReducer.actions

export default AuthRegReducer.reducer

export const selectState = (state: RootState) => state.AuthReg
