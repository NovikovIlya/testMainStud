export interface IRegRequest {
	lastName: string //фамилия
	firstName: string //имя
	middleName: string | null // отчество
	phone: string | null
	password: string
	email: string | null
}

export interface IRegResponse {
	answer: any //Error[] | string
}

export interface Error {
	message: string
}

export interface IAuthRequest {
	username: string
	password: string
}

export interface IAuthResponse {
	answer: any //AuthSuccess | Error[];
}

export interface ProfileData {
	lastName: string
	firstName: string
	middleName: string
	birthDate: string
	institut: string
	group: number
	workPlace: string
	kabinet: string //какой тип?
	phone: string
	fax: string //какой тип?
	email: string
}

export interface RegFormData {
	surname: string
	password: string
	name: string
	email: string | null
	phone: string | null
}
