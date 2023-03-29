import { AxiosPromise } from 'axios'

import endpoints from '../endpoints'
import { axiosInstance } from '../instance'

import {
	ChangePassword,
	IAuthRequest,
	IAuthResponse,
	IRegRequest,
	ProfileData
} from './types'

export const Reg_User = (params: IRegRequest): AxiosPromise<any> =>
	axiosInstance.post(endpoints.REG.REGISTR, params)

export const Auth_User = (params: IAuthRequest): AxiosPromise<IAuthResponse> =>
	axiosInstance.post(endpoints.AUTH.LOGIN, params)

export const Refresh_Token = () => axiosInstance.get(endpoints.AUTH.REFRESH)

export const Get_User_Data = () => axiosInstance.get(endpoints.GET_USER)

export const Put_User_Data = (params: ProfileData) =>
	axiosInstance.put(endpoints.GET_USER, params)

export const Change_User_Pass = (params: ChangePassword) =>
	axiosInstance.patch(endpoints.CHANGE_PASSWORD, params)
