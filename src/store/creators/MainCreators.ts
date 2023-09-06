import { Dispatch } from '@reduxjs/toolkit'
import request from 'axios'
import { Cookies } from 'react-cookie'

import {
	addEducation,
	addJobItem,
	approve,
	deleteEducation,
	deleteJobItem,
	deleteParent,
	document,
	education,
	form,
	getAddress,
	getDocument,
	getEducation,
	getForm,
	getJob,
	getParent,
	job,
	login,
	parent,
	postDocument,
	postParent,
	putAddress,
	putEducation,
	putForm,
	putParent,
	putPortfolioLink,
	refresh,
	register,
	role,
	updateJobItem
} from '../../api/index'
import {
	AbUSParentResponse,
	IAddress,
	IAddressRequest,
	IDocument,
	IDocumentAbUs,
	IDocumentRequest,
	IEducationRequest,
	IEducationState,
	IError,
	IParent,
	IParentRequest,
	IRole,
	IWorkHistoryRequest,
	educationItem,
	formItem,
	workItem
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

import { IWorkState } from './../../api/types'

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

export const setRole = async (
	data: IRole,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await role(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const setForm = async (
	data: formItem,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await form(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const setJob = async (
	data: IWorkHistoryRequest,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await job(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const setDocument = async (
	data: IDocumentRequest,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await document(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const setParent = async (
	data: IParentRequest,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await parent(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const setEducation = async (
	data: IEducationRequest,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await education(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
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
): Promise<IAddress | null> => {
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
): Promise<IWorkState | null> => {
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

export const putAbUsForm = async (
	data: formItem,
	dispatch: Dispatch
): Promise<number> => {
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return 403
		}
		await putForm(data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 200
}

export const putAbUsAddress = async (
	data: IAddressRequest,
	dispatch: Dispatch
): Promise<number> => {
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return 403
		}
		await putAddress(data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 200
}

export const portfolioLinkRequest = async (
	data: { portfolioLink: string },
	dispatch: Dispatch
): Promise<number> => {
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return 403
		}
		await putPortfolioLink(data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 200
}

export const deleteJobItemRequest = async (
	id: string,
	dispatch: Dispatch
): Promise<number> => {
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return 403
		}
		await deleteJobItem(id)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 200
}

export const updateJobItemRequest = async (
	id: string,
	data: workItem,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await updateJobItem(id, data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const addJobItemRequest = async (
	data: workItem,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await addJobItem(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const deleteEducationItemRequest = async (
	id: string,
	dispatch: Dispatch
): Promise<number> => {
	try {
		if ((await refreshToken(dispatch)) === 403) {
			return 403
		}
		await deleteEducation(id)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 200
}

export const putEducationItemRequest = async (
	id: string,
	data: educationItem,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await putEducation(id, data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const getEducationItemRequest = async (
	dispatch: Dispatch
): Promise<IEducationState[] | null> => {
	try {
		await refreshToken(dispatch)
		const response = await getEducation()
		return response.data
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return null
}

export const addEducationItemRequest = async (
	data: educationItem,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await addEducation(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

//граница

export const putParentItemRequest = async (
	id: string,
	data: IParent,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await putParent(id, data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const getParentItemRequest = async (
	dispatch: Dispatch
): Promise<AbUSParentResponse[] | null> => {
	try {
		await refreshToken(dispatch)
		const response = await getParent()
		return response.data
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return null
}

export const deleteParentItemRequest = async (
	id: string,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await deleteParent(id)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const postParentItemRequest = async (
	data: IParent,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await postParent(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const postDocumentItemRequest = async (
	data: IDocument,
	dispatch: Dispatch
): Promise<number> => {
	try {
		await refreshToken(dispatch)
		await postDocument(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const getDocumentItemRequest = async (
	dispatch: Dispatch
): Promise<IDocumentAbUs | null> => {
	try {
		await refreshToken(dispatch)
		const response = await getDocument()
		return response.data
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return null
}
