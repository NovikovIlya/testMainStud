import { Dispatch } from '@reduxjs/toolkit'
import request from 'axios'

import {
	addEducation,
	addJobItem,
	deleteEducation,
	deleteJobItem,
	deleteParent,
	getAddress,
	getDocument,
	getEducation,
	getForm,
	getJob,
	getParent,
	postDocument,
	postParent,
	putAddress,
	putEducation,
	putForm,
	putParent,
	putPortfolioLink,
	updateJobItem
} from '../../../api'
import {
	AbUSParentResponse,
	IAddress,
	IAddressRequest,
	IDocument,
	IDocumentAbUs,
	IEducationState,
	IError,
	IParent,
	IWorkState,
	educationItem,
	formItem,
	workItem
} from '../../../api/types'

import { refreshToken } from './Authorization'

export const getFormRequest = async (
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

export const putFormRequest = async (
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

export const getAddressRequest = async (
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

export const getJobRequest = async (
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

export const putAddressRequest = async (
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
