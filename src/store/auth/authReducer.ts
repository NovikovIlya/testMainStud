import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'

import { AuthSuccess, IError, ProfileData } from '../../api/auth/types'
import { RootState } from '../index'

const cookies = new Cookies()

export interface IAuthState {
	authData: {
		id: string | null
		accessToken: string | null
		isLoading: boolean
		error: IError[] | null
	}
	regData: {
		isLoading: boolean
		error: IError[] | null
	}
	profileData: {
		isLoading: boolean
		error: IError[] | null | String
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
		loginSuccess: (state, action: PayloadAction<AuthSuccess>): IAuthState => {
			localStorage.setItem('token', action.payload.accessToken)
			if (action.payload.refreshToken !== '') {
				cookies.set('refresh', action.payload.refreshToken)
			}
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
		putId: (state, action: PayloadAction<string>): IAuthState => {
			return {
				...state,
				authData: {
					...state.authData,
					id: action.payload
				}
			}
		},
		registSuccess: (state, action: PayloadAction<string>) => {
			state.regData.error = null
			state.regData.isLoading = false
			state.authData.id = action.payload
		},
		loginFailure: (state, action: PayloadAction<Error[]>): IAuthState => {
			if (action.payload.length === 0) {
				return {
					...state,
					authData: {
						...state.authData,
						error: null
					}
				}
			} else {
				return {
					...state,
					authData: {
						...state.authData,
						isLoading: false,
						error: action.payload
					}
				}
			}
		},
		registFailure: (state, action: PayloadAction<Error[]>): IAuthState => {
			if (action.payload.length === 0) {
				return {
					...state,
					regData: {
						...state.regData,
						error: null
					}
				}
			} else {
				return {
					...state,
					regData: {
						...state.regData,
						isLoading: false,
						error: action.payload
					}
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
			action: PayloadAction<ProfileData | null>
		): IAuthState => {
			if (action.payload !== null) {
				return {
					...state,
					profileData: {
						...state.profileData,
						isLoading: false,
						error: null,
						CurrentData: action.payload
					}
				}
			} else {
				return { ...state }
			}
		},
		loadProfileFailure: (state, action: PayloadAction<string>): IAuthState => ({
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
	putId,
	registStart,
	registFailure,
	registSuccess,
	logoutSuccess
} = authReducer.actions

export default authReducer.reducer

export const selectState = (state: RootState) => state.auth
