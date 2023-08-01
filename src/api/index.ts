import { AxiosPromise } from 'axios'

import endpoints from './endpoints'
import { axiosInstance } from './instance'
import { IApproveRequest, IAuthSuccess, IRoleInfo } from './types'
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
	axiosInstance.post(endpoints.REGISTER, params)

export const approve = (params: IApproveRequest): AxiosPromise<IAuthSuccess> =>
	axiosInstance.post(endpoints.APPROVE, params)

export const role = (params: IRoleInfo) =>
	axiosInstance.put(endpoints.SETROLE, params)
