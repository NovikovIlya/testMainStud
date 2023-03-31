import { Dispatch } from '@reduxjs/toolkit'
import { AxiosPromise } from 'axios'
import { useNavigate } from 'react-router-dom'

import {
	Auth_User,
	Change_User_Pass,
	Get_User_Data,
	Put_User_Data,
	Refresh_Token,
	Reg_User
} from '../../api/auth'
import { AuthSuccess } from '../../api/auth/types'
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
			setTimeout(() => {
				dispatch(registFailure([]))
			}, 8000)
			console.error(e.response)
		}
	}

let counter = 0

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
					if (counter === 0) {
						console.log(counter)
						const res = await Refresh_Token()
						if (res.status === 200) {
							accessToken = res.data.accessToken
						}
						counter++
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
			return null
		}
		return accessToken
	}

export const get_user_data =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			dispatch(loadProfileStart())
			const res = await Get_User_Data()
			if (res.status === 200) {
				dispatch(loadProfileSuccess(res.data))
				localStorage.setItem('user_data', JSON.stringify(res.data))
			}
		} catch (e: any) {
			dispatch(loadProfileFailure(e.response.data.errors))
			console.error(e.response)
		}
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
			setTimeout(() => {
				dispatch(loginFailure([]))
			}, 8000)
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
