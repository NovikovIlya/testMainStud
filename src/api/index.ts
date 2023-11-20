import { AxiosPromise } from 'axios'

import endpoints from './endpoints'
import { axiosInstance } from './instance'
import {
	AbUSParentResponse,
	IAddress,
	IAddressRequest,
	IApproveRequest,
	IAuthSuccess,
	IDocument,
	IDocumentAbUs,
	IDocumentRequest,
	IEducationRequest,
	IEducationState,
	IParent,
	IParentRequest,
	IRole,
	IWorkHistoryRequest,
	IWorkState,
	educationItem,
	formItem,
	workItem
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

export const job = (params: IWorkHistoryRequest) =>
	axiosInstance.post(endpoints.USER.INFO.JOB.JOB, params)

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

export const getAddress = (): AxiosPromise<IAddress> =>
	axiosInstance.get(endpoints.USER.INFO.ADDRESS)

export const getJob = (): AxiosPromise<IWorkState> =>
	axiosInstance.get(endpoints.USER.INFO.JOB.JOB)

export const getForm = (): AxiosPromise<formItem> =>
	axiosInstance.get(endpoints.USER.INFO.FORM)

export const putForm = (params: formItem) =>
	axiosInstance.put(endpoints.USER.INFO.FORM, params)

export const putPortfolioLink = (params: { portfolioLink: string }) =>
	axiosInstance.put(endpoints.USER.INFO.JOB.JOB, params)

export const addJobItem = (params: workItem) =>
	axiosInstance.post(endpoints.USER.INFO.JOB.JOBITEM, params)

export const updateJobItem = (id: string, data: workItem) =>
	axiosInstance.put(endpoints.USER.INFO.JOB.JOBITEM + '/' + id, data)

export const deleteJobItem = (id: string) =>
	axiosInstance.delete(endpoints.USER.INFO.JOB.JOBITEM + '/' + id)

export const putAddress = (params: IAddressRequest) =>
	axiosInstance.put(endpoints.USER.INFO.ADDRESS, params)

export const getEducation = (): AxiosPromise<IEducationState[]> =>
	axiosInstance.get(endpoints.USER.INFO.EDUCATION)

export const deleteEducation = (id: string) =>
	axiosInstance.delete(endpoints.USER.INFO.EDUCATION, { data: { id: id } })

export const putEducation = (id: string, params: educationItem) =>
	axiosInstance.put(endpoints.USER.INFO.EDUCATION, { ...params, id })

export const addEducation = (params: educationItem) =>
	axiosInstance.post(endpoints.USER.INFO.EDUCATION, params)

export const getParent = (): AxiosPromise<AbUSParentResponse[]> =>
	axiosInstance.get(endpoints.USER.INFO.PARENT)

export const putParent = (id: string, params: IParent) =>
	axiosInstance.put(endpoints.USER.INFO.PARENT, { ...params, id })

export const deleteParent = (id: string) =>
	axiosInstance.delete(endpoints.USER.INFO.PARENT, { data: { id } })

export const postParent = (params: IParent) =>
	axiosInstance.post(endpoints.USER.INFO.PARENT, params)

export const postDocument = (params: IDocument) =>
	axiosInstance.post(endpoints.USER.INFO.DOCUMENT, params)

export const getDocument = (): AxiosPromise<IDocumentAbUs> =>
	axiosInstance.get(endpoints.USER.INFO.DOCUMENT)

export const getRole = (): AxiosPromise<IRole[]> =>
	axiosInstance.get(endpoints.USER.INFO.ROLE)
