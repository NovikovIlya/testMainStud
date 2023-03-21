import axios, { AxiosError } from 'axios'

import { store } from '../store'
import { getAccessToken } from '../store/auth/actionCreators'

import endpoints from './endpoints'

export const API_URL = `http://localhost:8080/api`

export const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

const urlsSkipAuth = [endpoints.REG.REGISTR, endpoints.AUTH.LOGIN]

axiosInstance.interceptors.request.use(async (config: any) => {
	if (config.url && urlsSkipAuth.includes(config.url)) {
		return config
	}

	const accessToken = await store.dispatch(getAccessToken())

	if (accessToken) {
		const autharization = `Bearer ${accessToken}`

		config.headers = {
			...config.headers,
			autharization: autharization
		}

		return config
	}
})

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     const isLoggedIn = !!store.getState().auth.authData.accessToken;

//     if (error.response?.status === 403 && isLoggedIn) {
//       store.dispatch(LogOut);
//     }

//     return error;
//   },
// );
