export interface IRegRequest {
	lastName: string
	password: string
	firstName: string
	email: string | null
	agreement: string | null
}

export interface IAuthRequest {
	username: string
	password: string
}

export interface IError {
	message: string
}

export interface IRegError {
	errors: IError[]
}

export interface IAuthSuccess {
	accessToken: string
	refreshToken: string
	user: IUserData
}

export interface IUserData {
	username: string
	firstname: string
	lastname: string
	middlename: string
	birthday: string
	phone: string
	email: string
	citizenship: string
	roles: IRole[]
}

export interface IRole {
	login: string
	id: number | null
	type: string
}

export interface IAuthRegState {
	authData: {
		accessToken: string | null
		error: IError[] | null
	}
	regData: {
		error: IError[] | null
	}
}

export interface IProfileState {
	profileData: {
		error: IError[] | null | String
		CurrentData: IUserData | null
	}
}

export type TypeRole =
	| 'ABIT'
	| 'STUD'
	| 'SCHOOL'
	| 'SEEKER'
	| 'GUEST'
	| 'ATTEND'

export type IGender = 'W' | 'M'

export type ILanguage = 'RU' | 'EN' | 'en' | 'ru'

export type countryItem = {
	id: number
	shortName: string
}

export interface IDetailsRequest {
	role: TypeRole
	generalInfo: {
		name: string
		surName: string
		patronymic: string
		birthDay: string
		gender: IGender
		phone: string
		countryId: number
	}
	document: {
		documentTypeId: number
		passportSeries: string
		passportNumber: string
		issuedBy: string
		dateIssue: string
		divisionCode: string
		inn: string
		snils: string
	}
}

export type IRoleInfo = Pick<IDetailsRequest, 'role'>

export type IFormState = IDetailsRequest['generalInfo']

export type IDocumentState = IDetailsRequest['document']

export interface IEdForm {
	id: number
	nameOfInstitute: string
	educationLevel: string
	documentNumber: string
	documentSeries: string
	educationCountry: string
}

export type IParentState = IDetailsRequest['document'] & {
	FIO: string
	eMail: string
	phone: string
	registrationAddress: string
	residenceAddress: string
}

export interface IRefreshRequest {
	refreshToken: string
}

export interface IRefreshSuccess {
	accessToken: string
}

export interface data {
	tittle1: string
	tittle2: string
}

export interface IApproveRequest {
	id: string | null
	hash: string | null
}

export interface ICountryRequest {
	language: ILanguage
}
