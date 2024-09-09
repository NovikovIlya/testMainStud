import { AxiosPromise } from 'axios'


// import { axiosInstance } from './instance'
import endpoints from '../../api/endpoints'



// export const login = (params: any): AxiosPromise<any> =>
// 	axiosInstance.post(endpoints.LOGIN, params)

// export const refresh = (
// 	params: any
// ): any =>
// 	axiosInstance.post(endpoints.REFRESH, params)

// export const register = (params: any): AxiosPromise<number> =>
// 	axiosInstance.post(endpoints.REG.REGISTER, params)

// export const approve = (params: any): AxiosPromise<any> =>
// 	axiosInstance.post(endpoints.REG.APPROVE, params)

// // export const job = (params: IWorkHistoryRequest) =>
// // 	axiosInstance.post(endpoints.USER.INFO.JOB.JOB, params)

// // export const form = (params: formItem) =>
// // 	axiosInstance.post(endpoints.USER.INFO.FORM, params)

// // export const parent = (params: IParentRequest) =>
// // 	axiosInstance.post(endpoints.USER.INFO.PARENT, params)

// // export const education = (params: IEducationRequest) =>
// // 	axiosInstance.post(endpoints.USER.INFO.EDUCATION, params)

// export const role = (params: any) =>
// 	axiosInstance.post(endpoints.USER.INFO.ROLE, params)

// export const getRole = (): AxiosPromise<any[]> =>
// 	axiosInstance.get(endpoints.USER.INFO.ROLE)

// // export const document = (params: IDocumentRequest) =>
// // 	axiosInstance.post(endpoints.USER.INFO.DOCUMENT, params)

// export const getAddress = (): AxiosPromise<any> =>
// 	axiosInstance.get(endpoints.USER.INFO.ADDRESS)

// export const getJob = (): AxiosPromise<any> =>
// 	axiosInstance.get(endpoints.USER.INFO.JOB.JOB)

// export const getForm = (): AxiosPromise<any> =>
// 	axiosInstance.get(endpoints.USER.INFO.FORM)

// export const putForm = (params: any) =>
// 	axiosInstance.put(endpoints.USER.INFO.FORM, params)

// export const putPortfolioLink = (params: { portfolioLink: string }) =>
// 	axiosInstance.put(endpoints.USER.INFO.JOB.JOB, params)

// export const addJobItem = (params: any) =>
// 	axiosInstance.post(endpoints.USER.INFO.JOB.JOBITEM, params)

// export const updateJobItem = (id: string, data: any) =>
// 	axiosInstance.put(endpoints.USER.INFO.JOB.JOBITEM + '/' + id, data)

// export const deleteJobItem = (id: string) =>
// 	axiosInstance.delete(endpoints.USER.INFO.JOB.JOBITEM + '/' + id)

// export const putAddress = (params: any) =>
// 	axiosInstance.put(endpoints.USER.INFO.ADDRESS, params)

// export const getEducation = (): AxiosPromise<any[]> =>
// 	axiosInstance.get(endpoints.USER.INFO.EDUCATION)

// export const deleteEducation = (id: string) =>
// 	axiosInstance.delete(endpoints.USER.INFO.EDUCATION, { data: { id: id } })

// export const putEducation = (id: string, params: any) =>
// 	axiosInstance.put(endpoints.USER.INFO.EDUCATION, { ...params, id })

// export const addEducation = (params: any) =>
// 	axiosInstance.post(endpoints.USER.INFO.EDUCATION, params)

// export const getParent = (): AxiosPromise<any[]> =>
// 	axiosInstance.get(endpoints.USER.INFO.PARENT)

// export const putParent = (id: string, params: any) =>
// 	axiosInstance.put(endpoints.USER.INFO.PARENT, { ...params, id })

// export const deleteParent = (id: string) =>
// 	axiosInstance.delete(endpoints.USER.INFO.PARENT, { data: { id } })

// export const postParent = (params: any) =>
// 	axiosInstance.post(endpoints.USER.INFO.PARENT, params)

// export const postDocument = (params: any) =>
// 	axiosInstance.post(endpoints.USER.INFO.DOCUMENT, params)

// export const getDocument = (): AxiosPromise<any> =>
// 	axiosInstance.get(endpoints.USER.INFO.DOCUMENT)

// export const getAdmissionLink = (): AxiosPromise<{
// 	link: string
// 	session: string
// }> => axiosInstance.get(endpoints.USER.ADMISSION)
export const getAdmissionLink = () => {
	const url = `https://egp.kpfu.ru/user-api/admission-link`
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('access')?.replaceAll('"', '')}`,
		'Accept-Language': 'en'
	}

	return fetch(url, {
		method: 'GET',
		headers: headers
	})
	.then(response => response.json())
	.then(data => data)
	.catch(error => {
		console.error('Ошибка при получении ссылки на поступление:', error)
		throw error
	})
}