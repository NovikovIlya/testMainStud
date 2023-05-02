import { Dispatch } from '@reduxjs/toolkit'
import { Cookies } from 'react-cookie'

import { AuthScelet, RefreshTokenScelet } from '../../api/auth/index'
import { IAuthRequest } from '../../api/auth/types'
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
	async (dispatch: Dispatch): Promise<String> => {
		let answear = '401'
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

			answear = '200'
		} catch (e: any) {
			//401
			dispatch(LogInFailure(e.response.data.errors))
		}

		return answear
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
		let answear = null
		let accessToken = null
		try {
			if (localStorage.getItem('access') !== null) {
				accessToken = localStorage.getItem('access')
			}

			if (accessToken !== null) {
				if (isTokenExpired(accessToken)) {
					const res = await RefreshTokenScelet({
						refreshToken: cookies.get('refresh')
					})

					//200
					accessToken = res.data.accessToken
				}
				answear = '200'
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
			answear = '403'
		}

		return answear
	}
