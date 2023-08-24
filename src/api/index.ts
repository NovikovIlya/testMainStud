import { AxiosPromise } from 'axios'

import endpoints from './endpoints'
import { axiosInstance } from './instance'
import {
	IAdress,
	IApproveRequest,
	IAuthSuccess,
	IDocumentRequest,
	IEducationRequest,
	IParentRequest,
	IRole,
	IWorkHistoryRequest,
	formItem
} from './types'
import {
	IAuthRequest,
	IRefreshRequest,
	IRefreshSuccess,
	IRegRequest
} from './types'

export const login = (params: IAuthRequest): AxiosPromise<IAuthSuccess> =>
	axiosInstance.post(endpoints.LOGIN, params)

export const refresh = (
	params: IRefreshRequest
): AxiosPromise<IRefreshSuccess> =>
	axiosInstance.post(endpoints.REFRESH, params)

export const register = (params: IRegRequest): AxiosPromise<number> =>
	axiosInstance.post(endpoints.REG.REGISTER, params)

export const approve = (params: IApproveRequest): AxiosPromise<IAuthSuccess> =>
	axiosInstance.post(endpoints.REG.APPROVE, params)

export const job = (params: IWorkHistoryRequest) =>
	axiosInstance.post(endpoints.USER.INFO.JOB, params)

export const form = (params: formItem) =>
	axiosInstance.post(endpoints.USER.INFO.FORM, params)

export const parent = (params: IParentRequest) =>
	axiosInstance.post(endpoints.USER.INFO.PARENT, params)

export const education = (params: IEducationRequest) =>
	axiosInstance.post(endpoints.USER.INFO.EDUCATION, params)

export const role = (params: IRole) =>
	axiosInstance.post(endpoints.USER.INFO.ROLE, params)

export const document = (params: IDocumentRequest) =>
	axiosInstance.post(endpoints.USER.INFO.DOCUMENT, params)

export const getAddress = (): AxiosPromise<IAdress> =>
	axiosInstance.get(endpoints.USER.INFO.ADDRESS)

export const getJob = (): AxiosPromise<IWorkHistoryRequest> =>
	axiosInstance.get(endpoints.USER.INFO.JOB)

export const getForm = (): AxiosPromise<formItem> =>
	axiosInstance.get(endpoints.USER.INFO.FORM)

export const putForm = (params: formItem) =>
	axiosInstance.put(endpoints.USER.INFO.FORM, params)

export const putJob = (params: IWorkHistoryRequest) =>
	axiosInstance.put(endpoints.USER.INFO.DOCUMENT, params)

export const putAddress = (params: IAdress) =>
	axiosInstance.put(endpoints.USER.INFO.ADDRESS, params)
