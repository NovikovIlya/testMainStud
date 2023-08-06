import { AxiosPromise } from 'axios'

import endpoints from './endpoints'
import { axiosInstance } from './instance'
import { IApproveRequest, IAuthSuccess, IDetailsRequest } from './types'
import {
	IAuthRequest,
	ICountryRequest,
	IRefreshRequest,
	IRefreshSuccess,
	IRegRequest,
	countryItem
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

export const details = (params: IDetailsRequest) =>
	axiosInstance.put(endpoints.USER.DETAILS, params)

export const contries = (
	params: ICountryRequest
): AxiosPromise<countryItem[]> => axiosInstance.get(endpoints.USER.COUNTRIES)
