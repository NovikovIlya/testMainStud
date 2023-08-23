import { Dispatch } from '@reduxjs/toolkit'
import request from 'axios'
import { Cookies } from 'react-cookie'
import { useDispatch } from 'react-redux'

import {
	approve,
	document,
	education,
	form,
	getAddress,
	getForm,
	getJob,
	job,
	login,
	parent,
	refresh,
	register,
	role
} from '../../api/index'
import {
	IAdress,
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

export const refreshToken = async (dispatch: Dispatch): Promise<number> => {
	let accessToken = localStorage.getItem('access')
	let userData = localStorage.getItem('userInfo')

	if (accessToken == null || userData == null) {
		dispatch(logoutSuccess())
		return 403
	}

	try {
		dispatch(ProfileSuccess(JSON.parse(localStorage.getItem('userInfo') || '')))
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

export const setRole = async (
	data: IRole,
	dispatch: Dispatch
): Promise<IError | null> => {
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return { error: 'expired', details: [] }
		}
		await role(data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			return e.response?.data as IError
		}
	}
	return null
}

export const setForm = async (
	data: formItem,
	dispatch: Dispatch
): Promise<number> => {
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return 403
		}
		await form(data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 200
}

export const setJob = async (
	data: IWorkHistoryRequest,
	dispatch: Dispatch
): Promise<number> => {
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return 403
		}
		await job(data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 200
}

export const setDocument = async (
	data: IDocumentRequest,
	dispatch: Dispatch
): Promise<number> => {
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return 403
		}
		await document(data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 200
}

export const setParent = async (
	data: IParentRequest,
	dispatch: Dispatch
): Promise<number> => {
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return 403
		}
		await parent(data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 200
}

export const setEducation = async (
	data: IEducationRequest,
	dispatch: Dispatch
): Promise<number> => {
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return 403
		}
		await education(data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 200
}

export const getAbUsForm = async (
	dispatch: Dispatch
): Promise<formItem | null> => {
	let response = null
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return null
		}
		response = await getForm().then(response => response.data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return response
}

export const getAbUsAddress = async (
	dispatch: Dispatch
): Promise<IAdress | null> => {
	let response = null
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return null
		}
		response = await getAddress().then(response => response.data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return response
}

export const getAbUsJob = async (
	dispatch: Dispatch
): Promise<IWorkHistoryRequest | null> => {
	let response = null
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return null
		}
		response = await getJob().then(response => response.data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return response
}
