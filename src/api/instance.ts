import axios from 'axios'
import Cookies from 'universal-cookie'

import { store } from '../store'
import { getAccessToken } from '../store/auth/actionCreators'

import endpoints from './endpoints'

export const API_URL = `http://localhost:8080/api`

const cookies = new Cookies()

export const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

const urlWithOutBearer = [endpoints.REG.REGISTR, endpoints.AUTH.LOGIN]
const urlWithRefreshBearer = [endpoints.AUTH.REGRESH]
//const urlWithAccessBearer = [endpoints.PROFILE]

axiosInstance.interceptors.request.use(async (config: any) => {
	let authorization = null
	if (config.url && urlWithOutBearer.includes(config.url)) {
		return config
	} else {
		if (config.url && urlWithRefreshBearer.includes(config.url)) {
			console.log('refresh bearer')
			authorization = `Bearer ${cookies.get('refresh')}`
		} else {
			console.log('access bearer')
			const accessToken = await store.dispatch(getAccessToken())
			authorization = `Bearer ${accessToken}`
		}
	}

	config.headers = {
		...config.headers,
		authorization: authorization
	}

	return config
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
