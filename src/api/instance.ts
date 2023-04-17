import axios from 'axios'

// import Cookies from 'universal-cookie'

// import endpoints from './endpoints'

export const API_URL = `http://localhost:8080/api`

// const cookies = new Cookies()

export const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

// const urlWithoutBearer = [endpoints.REG, endpoints.AUTH.LOGIN]
// const urlWithRefreshBearer = [endpoints.AUTH.REFRESH]
// const urlWithAccessBearer = [endpoints.USERDATA]

// axiosInstance.interceptors.request.use(async (config: any) => {
// 	let authorization = null

// 	if (config.url && urlWithoutBearer.includes(config.url)) {
// 		return config
// 	} else {
// 		if (config.url && urlWithRefreshBearer.includes(config.url)) {
// 			authorization = `Bearer ${cookies.get('refresh')}`
// 		}

// 		if (config.url && urlWithAccessBearer.includes(config.url)) {
// 			const accessToken = localStorage.getItem('access')
// 			authorization = `Bearer ${accessToken}`
// 		}
// 	}

// 	config.headers = {
// 		...config.headers,
// 		authorization: authorization
// 	}

// 	return config
// })
