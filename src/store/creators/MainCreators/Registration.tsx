import { Dispatch } from '@reduxjs/toolkit'
import request from 'axios'

import { approve, register } from '../../../api'
import { IApproveRequest, IError, IRegRequest } from '../../../api/types'
import {
	loginSuccess,
	registrationFailure
} from '../../reducers/AuthRegReducer'
import { ProfileSuccess } from '../../reducers/ProfileReducer'

export const registerUser =
	(data: IRegRequest) =>
	async (dispatch: Dispatch): Promise<number> => {
		try {
			await register(data)
			dispatch(registrationFailure(null))
			return 200
		} catch (e) {
			if (request.isAxiosError(e) && e.response) {
				dispatch(registrationFailure(e.response?.data as IError))
			}
		}
		return 400
	}

export const approveEmail = async (
	data: IApproveRequest,
	dispatch: Dispatch
): Promise<number> => {
	try {
		const res = await approve(data)
		dispatch(
			loginSuccess({
				accessToken: res.data.accessToken,
				refreshToken: res.data.refreshToken
			})
		)
		localStorage.setItem('userInfo', JSON.stringify(res.data.user))
		dispatch(ProfileSuccess(res.data.user))
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}
