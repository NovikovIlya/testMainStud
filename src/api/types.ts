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

export interface errorItem {
	field: string
	message: string
}

export type IRegForm = {
	surname: string
	name: string
	email: string
	password: string
	confirmPassword: string
}

export interface IError {
	error: string
	details: errorItem[]
}

export interface IAuthSuccess {
	accessToken: string
	refreshToken: string
	user: IUserData
}

interface IRoles {
	login: string
	id: number | null
	type: string
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
	roles: IRoles[]
}

export interface IAuthRegState {
	authData: {
		accessToken: string | null
		error: IError | null
	}
	regData: {
		error: IError | null
	}
}

export interface IProfileState {
	profileData: {
		error: IError | null | String
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

export type ILanguage = 'en' | 'ru'

export type ICountryRequest = {
	id: number
	shortName: string
}

export type IEducationLevelRequest = {
	id: number
	name: string
}

export type IIdentifyDocumentRequest = {
	id: number
	type: string
}

export type IRole = {
	role: TypeRole
}

export type formItem = {
	name: string
	surName: string
	patronymic: string
	birthDay: string
	gender: IGender
	phone: string
	countryId: number
}

export type IDocument = {
	documentTypeId: number
	passportSeries: string
	passportNumber: string
	issuedBy: string
	dateIssue: string
	divisionCode: string
	inn: string
	snils: string
}

export type IDocumentRequest = { document: IDocument }

export type educationItem = {
	nameOfInstitute: string
	educationLevelId: number
	documentNumber: string
	documentSeries: string
	countryId: number
	graduateYear: string
	specialization: string
}

export type IEducationRequest = { educations: educationItem[] }

export type IEducationState = educationItem & { id: number }

export type IParentRequest = {
	name: string
	surName: string
	patronymic: string
	dateIssue: string
	divisionCode: string
	eMail: string
	issuedBy: string
	documentTypeId: number
	phone: string
	passportSeries: string
	passportNumber: string
	registrationAddress: string
	residenceAddress: string
	inn: string
	snils: string
}

export type IParentState = Omit<
	IParentRequest,
	'name' | 'surName' | 'patronymic'
> & {
	FIO: string
}

export type workItem = {
	name: string
	startDate: string
	endDate: string | null
	responsibilities: string
	additionalInfo: string
}

export type IWorkState = {
	items: (workItem & { id: number })[]
	portfolioLink: string
}

export type IWorkHistoryRequest = {
	workHistory: Omit<IWorkHistoryRequest, 'items'> & { items: workItem[] }
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
