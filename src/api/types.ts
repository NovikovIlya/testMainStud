import { IDocumentsRequest } from '../store/reducers/type'

export interface IRegRequest {
	lastName: string
	password: string
	firstName: string
	email: string | null
	agreement: string | null
}
export interface performanceItem {
	semester: number
	type: string
	hours: number
	credit: number
	is_test: IAnswer
	is_exam: IAnswer
	semester_points: number
	subject_name: string
	points_string: string
	exam_points: number
	pass_date: string
	total_points: number
}
export type IAnswer = 'y' | 'n'
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
	id: string
	type: string
}
export interface IResponse {
	id: number
	name: string
	type: string
	shortName: string
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
	sessionId: string
}

export type TypeRole =
	| 'ABIT'
	| 'STUD'
	| 'SCHOOL'
	| 'SEEKER'
	| 'GUEST'
	| 'ATTEND'

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
	documentTypeId: any
	passportSeries: string
	passportNumber: string
	issuedBy: string
	dateIssue: string
	divisionCode: string
	inn: string
	snils: string
}

export type IDocumentAbUs = {
	documentTypeId: number | null
	passportSeries: string | null
	passportNumber: string | null
	issuedBy: string | null
	dateIssue: string | null
	divisionCode: string | null
	inn: string | null
	snils: string | null
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

export type IEducationState = educationItem & { id: string }

export type IParent = {
	name: string | null
	surName: string | null
	patronymic: string | null
	dateIssue: string | null
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
	mother?: string
	father?: string
}

export type IParentRequest = {
	parent: IParent
}

export type AbUSParentResponse = IParent & { id: number }

export type IParentState = Omit<IParent, 'name' | 'surName' | 'patronymic'> & {
	FIO: string

	id: string
}

export type workItem = {
	id: string
	name: string
	startDate: string
	endDate: string | null
	responsibilities: string
	additionalInfo: string
}

export type IWorkState = {
	items: workItem[]
	portfolioLink: string | null
}

export type IWorkHistoryRequest = {
	items: workItem[]
	portfolioLink: string | null
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

export type addressItem = {
	countryId: number
	city: string
	street: string
	house: string
	apartment: string
	index: string
}

export type IAddress = {
	registrationAddress: addressItem
	residenceAddress: addressItem
}

export type IAddressRequest = {
	registrationAddress: addressItem
	residenceAddress: addressItem | null
}

export type ICountriesDocumentsState = {
	countries: ICountryRequest[] | null
	educations: IEducationLevelRequest[] | null
	documents: IDocumentsRequest[] | null
}

export type IWorkItemsError = {
	id: number
	name: boolean
	startDate: boolean
	responsibilities: boolean
	additionalInfo: boolean
}

export type IWorkError = {
	item: IWorkItemsError | null
	portfolio: boolean
}

export type IEducationError = {
	id: number
	nameOfInstitute: boolean
	documentNumber: boolean
	documentSeries: boolean
	graduateYear: boolean
	specialization: boolean
}

export type IParentError = {
	id: number
	FIO: boolean
	dateIssue: boolean
	divisionCode: boolean
	eMail: boolean
	issuedBy: boolean
	phone: boolean
	passportSeries: boolean
	passportNumber: boolean
	registrationAddress: boolean
	residenceAddress: boolean
	inn: boolean
	snils: boolean
}
export interface ILayout {
	lg: Lg[]
	sm: Lg[]
	xs: Lg[]
	xxs: Lg[]
	md: Lg[]
}

export interface Lg {
	w: number
	h: number
	x: number
	y: number
	i: string
	maxW: number
	minH: number
	maxH: number
	moved: boolean
	static: boolean
}
