import { Dispatch } from '@reduxjs/toolkit'
import request from 'axios'
import { Cookies } from 'react-cookie'

import {
	approve,
	document,
	education,
	form,
	job,
	login,
	parent,
	refresh,
	register,
	role
} from '../../api/index'
import {
	IDocumentRequest,
	IEducationRequest,
	IError,
	IParentRequest,
	IRole,
	IWorkHistoryRequest,
	formItem
} from '../../api/types'
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
				dispatch(loginFailure(e.response?.data as IError))
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
			dispatch(registrationFailure(null))
			return 200
		} catch (e) {
			if (request.isAxiosError(e) && e.response) {
				dispatch(registrationFailure(e.response?.data as IError))
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

export const setRole = (data: IRole) => async () => {
	try {
		await role(data)
		return []
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			return e.response?.data as IError
		}
	}
}

export const setForm = (data: formItem) => async (): Promise<IError | null> => {
	try {
		await form(data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			return e.response?.data as IError
		}
	}
	return null
}

export const setJob =
	(data: IWorkHistoryRequest) => async (): Promise<IError | null> => {
		try {
			await job(data)
		} catch (e) {
			if (request.isAxiosError(e) && e.response) {
				return e.response?.data as IError
			}
		}
		return null
	}

export const setDocument =
	(data: IDocumentRequest) => async (): Promise<IError | null> => {
		try {
			await document(data)
		} catch (e) {
			if (request.isAxiosError(e) && e.response) {
				return e.response?.data as IError
			}
		}
		return null
	}

export const setParent = (data: IParentRequest) => async () => {
	try {
		await parent(data)
		return []
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			return e.response?.data as IError
		}
	}
}

export const setEducation = (data: IEducationRequest) => async () => {
	try {
		await education(data)
		return []
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			return e.response?.data as IError
		}
	}
}
