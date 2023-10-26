import { Dispatch } from '@reduxjs/toolkit'
import request from 'axios'

import {
	addEducation,
	addJobItem,
	approve,
	deleteEducation,
	deleteJobItem,
	deleteParent,
	document,
	form,
	getDocument,
	getEducation,
	getForm,
	getJob,
	getParent,
	getRole,
	job,
	postDocument,
	postParent,
	putAddress,
	putEducation,
	putForm,
	putParent,
	putPortfolioLink,
	role,
	updateJobItem
} from '../../api/index'
import {
	AbUSParentResponse,
	IAddressRequest,
	IDocument,
	IDocumentAbUs,
	IDocumentRequest,
	IEducationState,
	IError,
	IParent,
	IRole,
	IWorkHistoryRequest,
	educationItem,
	formItem,
	workItem
} from '../../api/types'
import { IApproveRequest } from '../../api/types'
import { loginSuccess } from '../reducers/AuthRegReducer'
import { ProfileSuccess } from '../reducers/ProfileReducer'

import { IWorkState } from './../../api/types'

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
	return 400
}

export const setRole = async (data: IRole): Promise<number> => {
	try {
		await role(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const setForm = async (data: formItem): Promise<number> => {
	try {
		await form(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const setJob = async (data: IWorkHistoryRequest): Promise<number> => {
	try {
		await job(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const setDocument = async (data: IDocumentRequest): Promise<number> => {
	try {
		await document(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const getAbUsForm = async (): Promise<formItem | null> => {
	let response = null
	try {
		response = await getForm().then(response => response.data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return response
}

export const getAbUsJob = async (): Promise<IWorkState | null> => {
	let response = null
	try {
		response = await getJob().then(response => response.data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return response
}

export const putAbUsForm = async (data: formItem): Promise<number> => {
	try {
		await putForm(data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 200
}

export const putAbUsAddress = async (
	data: IAddressRequest
): Promise<number> => {
	try {
		await putAddress(data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 200
}

export const portfolioLinkRequest = async (data: {
	portfolioLink: string
}): Promise<number> => {
	try {
		await putPortfolioLink(data)
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 200
}

export const deleteJobItemRequest = async (id: string): Promise<number> => {
	try {
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
	data: workItem
): Promise<number> => {
	try {
		await updateJobItem(id, data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const addJobItemRequest = async (data: workItem): Promise<number> => {
	try {
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
	id: string
): Promise<number> => {
	try {
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
	data: educationItem
): Promise<number> => {
	try {
		await putEducation(id, data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const getEducationItemRequest = async (): Promise<
	IEducationState[] | null
> => {
	try {
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
	data: educationItem
): Promise<number> => {
	try {
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
	data: IParent
): Promise<number> => {
	try {
		await putParent(id, data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const getParentItemRequest = async (): Promise<
	AbUSParentResponse[] | null
> => {
	try {
		const response = await getParent()
		return response.data
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return null
}

export const deleteParentItemRequest = async (id: string): Promise<number> => {
	try {
		await deleteParent(id)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const postParentItemRequest = async (data: IParent): Promise<number> => {
	try {
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
	data: IDocument
): Promise<number> => {
	try {
		await postDocument(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}
	return 403
}

export const getDocumentItemRequest =
	async (): Promise<IDocumentAbUs | null> => {
		try {
			const response = await getDocument()
			return response.data
		} catch (e) {
			if (request.isAxiosError(e) && e.response) {
				console.log(e.response?.data as IError)
			}
		}
		return null
	}

export const getUserRole = async (): Promise<IRole | null> => {
	try {
		const response = await getRole()
		if (response.data && response.data.length > 0) {
			return response.data[0]
		}
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			console.log(e.response?.data as IError)
		}
	}

	return null
}
