import axios from 'axios'

export const API_URL = `https://egp.kpfu.ru/`
export const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

axiosInstance.interceptors.request.use(
	config => {
		if (['users/me', 'admission-link'].some(el => config.url?.includes(el))) {
			config.headers['Authorization'] =
				'Bearer ' + `${localStorage.getItem('access')?.replaceAll('"', '')}}`
		}
		config.headers['Accept-Language'] = 'en'

		return config
	},
	error => {
		console.log(Promise.reject(error))
	}
)
