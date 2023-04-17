export interface IRegRequest {
	lastName: string
	firstName: string
	middleName: string | null
	phone: string | null
	password: string
	email: string | null
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

export interface IAuthReducerRequest {
	accessToken: string
	refreshToken: string
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

export interface IRegFormData {
	surname: string
	password: string
	name: string
	email: string | null
	phone: string | null
	confirmPassword: string | null
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

export interface IRefreshRequest {
	refreshToken: string
}

export interface IRegfreshSuccess {
	accessToken: string
}
