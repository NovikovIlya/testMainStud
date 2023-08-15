import { Dispatch } from '@reduxjs/toolkit'
import request from 'axios'
import { Cookies } from 'react-cookie'

import { approve, details, login, refresh, register } from '../../api/index'
import { IDetailsRequest, IRegError } from '../../api/types'
import { IApproveRequest, IAuthRequest, IRegRequest } from '../../api/types'
import {
	loginFailure,
	loginSuccess,
	logoutSuccess,
	refreshSuccess,
	registrationFailure
} from '../reducers/AuthRegReducer'
import { ProfileSuccess } from '../reducers/ProfileReducer'

const cookies = new Cookies()

export const loginUser =
	(data: IAuthRequest) =>
	async (dispatch: Dispatch): Promise<number> => {
		let answer = 403
		try {
			const res = await login(data)

			dispatch(
				loginSuccess({
					accessToken: res.data.accessToken,
					refreshToken: res.data.refreshToken
				})
			)
			localStorage.setItem('userInfo', JSON.stringify(res.data.user))
			dispatch(ProfileSuccess(res.data.user))

			answer = 200
		} catch (e) {
			if (request.isAxiosError(e) && e.response) {
				dispatch(loginFailure((e.response?.data as IRegError).errors))
			}
		}
		return answer
	}

export const refreshToken =
	() =>
	async (dispatch: Dispatch): Promise<number> => {
		let accessToken = localStorage.getItem('access')
		let userData = localStorage.getItem('userInfo')

		if (accessToken == null || userData == null) {
			dispatch(logoutSuccess())
			return 403
		}

		try {
			dispatch(
				ProfileSuccess(JSON.parse(localStorage.getItem('userInfo') || ''))
			)
			await refresh({
				refreshToken: accessToken
			})
			return 200
		} catch (e: any) {
			try {
				const res = await refresh({
					refreshToken: cookies.get('refresh')
				})
				localStorage.removeItem('access')
				localStorage.setItem('access', res.data.accessToken)
				dispatch(refreshSuccess(res.data.accessToken))
				return 200
			} catch (e: any) {
				dispatch(logoutSuccess())
				return 403
			}
		}
	}

export const registerUser =
	(data: IRegRequest) =>
	async (dispatch: Dispatch): Promise<number> => {
		try {
			await register(data)
			dispatch(registrationFailure([]))
			return 200
		} catch (e) {
			if (request.isAxiosError(e) && e.response) {
				dispatch(registrationFailure((e.response?.data as IRegError).errors))
			}
		}
		return 400
	}

export const approveEmail =
	(data: IApproveRequest) =>
	async (dispatch: Dispatch): Promise<void> => {
		const res = await approve(data)

		dispatch(
			loginSuccess({
				accessToken: res.data.accessToken,
				refreshToken: res.data.refreshToken
			})
		)
		localStorage.setItem('userInfo', JSON.stringify(res.data.user))
		dispatch(ProfileSuccess(res.data.user))
	}

export const userDetails = (data: IDetailsRequest) => async () => {
	try {
		await details(data)
	} catch (e) {}
}
