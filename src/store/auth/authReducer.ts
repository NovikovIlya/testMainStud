import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'

import { Error, ProfileData } from '../../api/auth/types'
import { RootState } from '../index'

const cookies = new Cookies()

export interface IAuthState {
	authData: {
		id: string | null
		accessToken: string | null
		isLoading: boolean
		error: Error[] | null
	}
	regData: {
		isLoading: boolean
		error: Error[] | null
	}
	profileData: {
		// profile: string | null
		isLoading: boolean
		error: Error[] | null
		CurrentData: ProfileData | null
	}
}

const initialState: IAuthState = {
	authData: {
		id: null,
		accessToken: null,
		error: null,
		isLoading: false
	},
	regData: {
		isLoading: false,
		error: null
	},
	profileData: {
		error: null,
		isLoading: false,
		// profile: null,
		CurrentData: null
	}
}

export const authReducer = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginStart: (state): IAuthState => ({
			...state,
			authData: {
				...state.authData,
				isLoading: true
			}
		}),
		registStart: (state): IAuthState => ({
			...state,
			regData: {
				...state.authData,
				isLoading: true
			}
		}),
		loginSuccess: (state, action: PayloadAction<any>): IAuthState => {
			localStorage.setItem('token', action.payload.accessToken)
			cookies.set('refresh', action.payload.refreshToken, { maxAge: 43200 })
			return {
				...state,
				authData: {
					...state.authData,
					isLoading: false,
					accessToken: action.payload.accessToken,
					error: null
				}
			}
		},
		registSuccess: (state, action: PayloadAction<string>) => {
			state.regData.error = null
			state.regData.isLoading = false
			state.authData.id = action.payload
		},
		loginFailure: (state, action: PayloadAction<Error[]>): IAuthState => ({
			...state,
			authData: {
				...state.authData,
				isLoading: false,
				error: action.payload
			}
		}),
		registFailure: (state, action: PayloadAction<any>): IAuthState => {
			return {
				...state,
				regData: {
					isLoading: false,
					error: action.payload
				}
			}
		},
		loadProfileStart: (state): IAuthState => ({
			...state,
			profileData: {
				...state.profileData,
				isLoading: true
			}
		}),
		loadProfileSuccess: (
			state,
			action: PayloadAction<{ data: ProfileData }>
		): IAuthState => ({
			...state,
			profileData: {
				...state.profileData,
				// profile: action.payload,
				isLoading: false,
				error: null,
				CurrentData: action.payload.data
			}
		}),
		loadProfileFailure: (
			state,
			action: PayloadAction<Error[]>
		): IAuthState => ({
			...state,
			profileData: {
				...state.profileData,
				isLoading: false,
				error: action.payload
			}
		}),
		logoutSuccess: (): IAuthState => {
			cookies.remove('refresh')
			localStorage.clear()
			return initialState
		}
	}
})

export const {
	loadProfileFailure,
	loadProfileStart,
	loadProfileSuccess,
	loginFailure,
	loginStart,
	loginSuccess,
	registStart,
	registFailure,
	registSuccess,
	logoutSuccess
} = authReducer.actions

export default authReducer.reducer

export const selectState = (state: RootState) => state.auth
