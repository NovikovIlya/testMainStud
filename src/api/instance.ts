import axios from 'axios'

export const API_URL = `http://192.168.63.96:8080/api`
//`http://192.168.63.96:8080/api`
//'http://localhost:8080/api'
export const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

axiosInstance.interceptors.request.use(
	config => {
		config.url === '/users/me/details' &&
			(config.headers.Authorization =
				'Bearer ' + `${localStorage.getItem('access')}`)
		console.log(config)
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
