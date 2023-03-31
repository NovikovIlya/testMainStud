import { Dispatch } from '@reduxjs/toolkit'

import {
	Auth_User,
	Change_User_Pass,
	Get_User_Data,
	Put_User_Data,
	Refresh_Token,
	Reg_User
} from '../../api/auth'
import {
	ChangePassword,
	IAuthRequest,
	IRegRequest,
	ProfileData
} from '../../api/auth/types'
import { isTokenExpired } from '../../utils/jwt'
import { store } from '../index'

import {
	loadProfileFailure,
	loadProfileStart,
	loadProfileSuccess,
	loginFailure,
	loginStart,
	loginSuccess,
	logoutSuccess,
	putId,
	registFailure,
	registStart,
	registSuccess
} from './authReducer'

export const regUser =
	(data: IRegRequest) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			dispatch(registStart())
			const res = await Reg_User(data)
			if (res.status === 201) {
				dispatch(registSuccess(res.data))
				localStorage.setItem('user_id', res.data)
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
					const res = await Refresh_Token()
					if (res.status === 200) {
						accessToken = res.data.accessToken
					}
				}
				dispatch(
					loginSuccess({
						accessToken: accessToken,
						refreshToken: ''
					})
				)
			}
		} catch (e: any) {
			//если 403
			dispatch(logoutSuccess())
			console.error(e)
			return '403'
		}
		return accessToken
	}

export const get_user_data =
	() =>
	async (dispatch: Dispatch): Promise<string> => {
		try {
			console.log('get_data')
			dispatch(loadProfileStart())
			const res = await Get_User_Data()
			if (res.status === 200) {
				localStorage.setItem('user_data', JSON.stringify(res.data))
				dispatch(
					loadProfileSuccess(
						JSON.parse(localStorage.getItem('user_data') || '{}')
					)
				)
				return '200'
			}
		} catch (e: any) {
			dispatch(loadProfileFailure(e.response.data.errors))
			console.error(e.response)
		}
		return '404'
	}

export const loginUser =
	(data: IAuthRequest) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			dispatch(loginStart())
			const res = await Auth_User(data)

			if (res.status === 200) {
				dispatch(
					loginSuccess({
						accessToken: res.data.accessToken,
						refreshToken: res.data.refreshToken
					})
				)
			}
		} catch (e: any) {
			dispatch(loginFailure(e.response.data.errors))
		}
	}

export const change_user_data =
	(data: ProfileData) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			dispatch(loadProfileStart())
			const res = await Put_User_Data(data)
			if (res.status === 204) {
				console.log('Пользовательские данные успешно изменены')
				dispatch(loadProfileSuccess(null))
			}
		} catch (e: any) {
			dispatch(
				loadProfileFailure('ошибка при изменении пользовательских данных')
			)
		}
	}

export const change_user_password =
	(data: ChangePassword) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			dispatch(loadProfileStart())
			const res = await Change_User_Pass(data)
			if (res.status === 204) {
				console.log('Пользовательский пароль изменен успешно')
				dispatch(loadProfileSuccess(null))
			}
		} catch (e: any) {
			dispatch(loadProfileFailure('ошибка в изменении пароля'))
			//console.error(e.response)
		}
	}

export const init_state_with_user_data =
	() =>
	async (dispatch: Dispatch<any>): Promise<void> => {
		dispatch(
			loadProfileSuccess(JSON.parse(localStorage.getItem('user_data') || '{}'))
		)
		dispatch(putId(localStorage.getItem('user_id') || ''))
	}

export const log_out =
	() =>
	async (dispatch: Dispatch<any>): Promise<void> => {
		dispatch(logoutSuccess())
	}

export const Base_Login_Errors =
	() =>
	async (dispatch: Dispatch<any>): Promise<void> => {
		dispatch(loginFailure([]))
	}

export const Base_Registration_Errors =
	() =>
	async (dispatch: Dispatch<any>): Promise<void> => {
		dispatch(registFailure([]))
	}
