import axios from 'axios'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()
export const API_URL = `http://192.168.63.96:8080/api`
export const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

axiosInstance.interceptors.request.use(
	config => {
		if (
			['role', 'document', 'parent', 'address'].some(
				el =>
					config.url === '/users/me/' + el ||
					config.url === '/users/me' ||
					config.url?.includes('work-history') ||
					config.url?.includes('education')
			)
		) {
			config.headers['Authorization'] =
				'Bearer ' + `${localStorage.getItem('access')}`
		}
		config.headers['Accept-Language'] = cookies.get('i18next')
		return config
	},
	error => {
		console.log(Promise.reject(error))
	}
)
