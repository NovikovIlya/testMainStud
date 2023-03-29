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
	lastName: string | null
	firstName: string | null
	middleName: string | null
	birthDate: string | null
	citizenship: string | null
	birthPlace: string | null
	institut: string | null
	group: number | null
	workPlace: string | null
	kabinet: number | null
	phone: string | null
	fax: string | null
	email: string | null
}

export interface RegFormData {
	surname: string
	password: string
	name: string
	email: string | null
	phone: string | null
}

export interface ChangePassword {
	password: string
}
