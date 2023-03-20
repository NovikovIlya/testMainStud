import { AxiosPromise } from 'axios'

import endpoints from '../endpoints'
import { axiosInstance } from '../instance'

import { IAuthRequest, IAuthResponse, IRegRequest } from './types'

export const Reg_User = (params: IRegRequest): AxiosPromise<any> =>
	axiosInstance.post(endpoints.REG.REGISTR, params)
export const Auth_User = (params: IAuthRequest): AxiosPromise<IAuthResponse> =>
	axiosInstance.post(endpoints.AUTH.LOGIN, params)
export const Refresh_Token = () => axiosInstance.get(endpoints.AUTH.REGRESH)
export const Get_User_Data = () => axiosInstance.get(endpoints.PROFILE)
