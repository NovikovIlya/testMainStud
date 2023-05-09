import { RootState } from '..'
import { Dispatch } from '@reduxjs/toolkit'
import { Cookies } from 'react-cookie'
import { useSelector } from 'react-redux'

import { login, refresh } from '../../api/index'
import { IAuthRequest } from '../../api/types'
import {
	loginFailure,
	loginSuccess,
	logoutSuccess,
	refreshSuccess
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
		} catch (e: any) {
			dispatch(loginFailure(e.response.data.errors))
		}

		return answer
	}

export const refreshToken =
	() =>
	async (dispatch: Dispatch): Promise<number> => {
		let answer = 403

		let accessToken = localStorage.getItem('access')
		if (accessToken === null) {
			accessToken = useSelector(
				(state: RootState) => state.AuthReg.authData.accessToken
			)
		}

		if (accessToken !== null) {
			try {
				const res = await refresh({
					//access
					refreshToken: accessToken
				})
				answer = 200
				dispatch(refreshSuccess(accessToken))
			} catch (e: any) {
				try {
					const res = await refresh({
						//refresh
						refreshToken: cookies.get('refresh')
					})
					answer = 200
					localStorage.removeItem('access')
					localStorage.setItem('access', res.data.accessToken)
					dispatch(refreshSuccess(res.data.accessToken))
				} catch (e: any) {
					dispatch(logoutSuccess())
				}
			}
		}
		if (answer === 200) {
			dispatch(
				ProfileSuccess(JSON.parse(localStorage.getItem('userInfo') || ''))
			)
		}

		return answer
	}
