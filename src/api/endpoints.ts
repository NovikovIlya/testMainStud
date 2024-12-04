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
			JOB: {
				JOB: '/users/me/work-history',
				JOBITEM: '/users/me/work-history/items'
			},
			FORM: '/users/me',
			ADDRESS: '/users/me/address'
		},
		COUNTRIES: '/country',
		EDUCATION_LEVEL: '/education/levels',
		DOCUMENTS: '/document',
		ADMISSION: '/user-api/admission-link'
	}
}

export default endpoints
