import { Dispatch } from '@reduxjs/toolkit'
import request from 'axios'

import { document, education, form, job, parent, role } from '../../../api'
import {
	IDocumentRequest,
	IEducationRequest,
	IError,
	IParentRequest,
	IRole,
	IWorkHistoryRequest,
	formItem
} from '../../../api/types'

import { refreshToken } from './Authorization'

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
