const endpoints = {
	LOGIN: '/login',
	REFRESH: '/token/refresh',
	REG: {
		REGISTER: '/register',
		APPROVE: '/register/approve'
	},
	USER: {
		INFO: {
			ROLE: '/users/me/role',
			DOCUMENT: '/users/me/document',
			EDUCATION: '/users/me/education',
			PARENT: '/users/me/parent',
			JOB: '/users/me/work-history',
			FORM: '/users/me'
		},
		COUNTRIES: '/country',
		EDUCATION_LEVEL: '/education/levels',
		DOCUMENTS: '/document'
	}
}

export default endpoints
