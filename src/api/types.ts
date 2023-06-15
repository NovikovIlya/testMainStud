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

export interface IFormState {
	role: string
	infoForm: {
		name: string
		surName: string
		patronymic: string | null
		birthDay: string
		gender: string
		phoneNumber: string
		country: string
	}
	education: {
		country: string
		nameOfInstitute: string
		educationLevel: string
		passwordSeries: string | null
		passwordNumber: string | null
	}
	documents: {
		mainDocument: string
		passwordSeries: string | null
		passwordNumber: string | null
		issuedBy: string | null
		dateIssue: string | null
		divisionCode: string | null
		inn: string
		snils: string
	}
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
