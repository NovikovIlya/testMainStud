const endpoints = {
	LOGIN: '/login',
	REFRESH: '/token/refresh',
	REG: {
		REGISTER: '/register',
		APPROVE: '/register/approve'
	},
	USER: {
		DETAILS: '/users/me/details',
		COUNTRIES: '/country',
		EDUCATION_LEVEL: '/education/levels',
		DOCUMENTS: '/document'
	}
}

export default endpoints
