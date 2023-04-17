import { Dispatch } from '@reduxjs/toolkit'
import { Cookies } from 'react-cookie'

import { AuthScelet, RefreshTokenScelet } from '../../api/auth/index'
import { IAuthRequest, IRefreshRequest } from '../../api/auth/types'
import { isTokenExpired } from '../../utils/jwt'
import {
	LogInFailure,
	LogInSuccess,
	LogOutSuccess
} from '../reducers/AuthRegReducer'
import { ProfileSuccess } from '../reducers/ProfileReducer'

const cookies = new Cookies()

export const RequestFolLogIn =
	(data: IAuthRequest) =>
	async (dispatch: Dispatch): Promise<void> => {
		try {
			const res = await AuthScelet(data)

			//200
			dispatch(
				LogInSuccess({
					accessToken: res.data.accessToken,
					refreshToken: res.data.refreshToken
				})
			)
			dispatch(ProfileSuccess(res.data.user))
		} catch (e: any) {
			//401
			dispatch(LogInFailure(e.response.data.errors))
		}
	}

// export const RequestForRegistration =
// 	(data: IRegRequest) =>
// 	async (dispatch: Dispatch): Promise<void> => {
// 		try {
// 			const res = await RegScelet(data)

// 			//201
// 			dispatch(RegistSuccess(res.data))
// 			localStorage.setItem('user_id', res.data)
// 		} catch (e: any) {
// 			//400
// 			dispatch(RegistFailure(e.response.data.errors))
// 		}
// 	}

export const RequestForTokens =
	() =>
	async (dispatch: Dispatch): Promise<string | null> => {
		let accessToken = null
		try {
			if (localStorage.getItem('access') !== null) {
				accessToken = localStorage.getItem('access')
			}

			if (accessToken !== null) {
				if (isTokenExpired(accessToken)) {
					const res = await RefreshTokenScelet(cookies.get('refresh'))

					//200
					accessToken = res.data.accessToken
				}

				dispatch(
					LogInSuccess({
						accessToken: accessToken,
						refreshToken: ''
					})
				)
			}
		} catch (e: any) {
			//если 403
			dispatch(LogOutSuccess())
			return '403'
		}

		return accessToken
	}
