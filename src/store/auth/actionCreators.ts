import { Dispatch } from '@reduxjs/toolkit'

import { Auth_User, Refresh_Token, Reg_User } from '../../api/auth'
import { IAuthRequest, IRegRequest } from '../../api/auth/types'
import { isTokenExpired } from '../../utils/jwt'
import { store } from '../index'

import {
	loadProfileSuccess,
	loginFailure,
	loginStart,
	loginSuccess,
	registFailure,
	registStart,
	registSuccess
} from './authReducer'

export const loginUser =
	(data: IAuthRequest) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			dispatch(loginStart())
			const res = await Auth_User(data)

			if (res.status === 200) {
				dispatch(loginSuccess(res.data))
			}
			//dispatch(getProfile())
		} catch (e: any) {
			dispatch(loginFailure(e.response.data.errors))
			//console.error(e)
			//dispatch(loginFailure(e.messages))
		}
	}

export const regUser =
	(data: IRegRequest) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			dispatch(registStart())
			const res = await Reg_User(data)
			if (res.status === 201) {
				dispatch(registSuccess(res.data))
			}
		} catch (e: any) {
			dispatch(registFailure(e.response.data.errors))
			console.error(e.response)
		}
	}

export const getAccessToken =
	() =>
	async (dispatch: Dispatch<any>): Promise<string | null> => {
		let accessToken = null
		try {
			if (localStorage.getItem('token') !== null) {
				accessToken = localStorage.getItem('token')
			} else {
				accessToken = store.getState().auth.authData.accessToken
			}

			if (accessToken !== null) {
				if (isTokenExpired(accessToken)) {
					dispatch(loginStart())
					const res = await Refresh_Token()
					if (res.status === 200) {
						dispatch(loginSuccess(res.data))
					}
					accessToken = res.data.accessToken
				}
			}
		} catch (e: any) {
			dispatch(loginFailure(e.response.data.errors)) //если 403
			console.error(e)
		}
		return accessToken
	}

// export const getUserData = () => async (dispatch: Dispatch<any>): Promise<void> => {
//   try {
//     dispatch
//   }
// }
