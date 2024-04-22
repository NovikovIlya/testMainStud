import * as Yup from 'yup'

export const SignInSchema = Yup.object({
	contractNumber: Yup.string()
		.matches(
			/^[A-Za-zА-Яа-я0-9-/№]+$/,
			'Номер договора может содержать только буквы, арабские цифры, символы -, /, №'
		)
		.required('Обязательное поле'),
	contractFacility: Yup.string()
		.matches(
			/^[A-Za-zА-Яа-я0-9№\s]+$/,
			'Наименование может содержать только буквы, арабские цифры и символ №'
		)
		.required('Обязательное поле'),
	dateConclusionContract: Yup.date()
		.transform((value, originalValue) => {
			return originalValue ? new Date(originalValue) : null
		})
		.required('Укажите дату'),
	prolongation: Yup.number().positive('Число лет должно быть положительным'),
	contractTime: Yup.date()
		.transform((value, originalValue) => {
			return originalValue ? new Date(originalValue) : null
		})
		.required('Укажите дату'),
	legalFacility: Yup.string()
		.matches(
			/^[A-Za-zА-Яа-я0-9\s]+$/,
			'Адрес организации может содержать только буквы и арабские цифры'
		)
		.required('Обязательное поле'),
	actualFacility: Yup.string()
		.matches(
			/^[A-Za-zА-Яа-я0-9\s]+$/,
			'Адрес организации может содержать только буквы и арабские цифры'
		)
		.required('Обязательное поле'),
	placeNumber: Yup.number()
		.positive('Число должно быть положительным')
		.required('Обязательное поле'),
	contractType: Yup.string().required('Тип договора обязателен для выбора'),
	specialtyName: Yup.string().required('Поле обязательно для выбора')
})

export const NewTaskSchema = Yup.object({
	practiceType: Yup.string().required('Поле обязательно для выбора'),
	specialityName: Yup.string().required('Поле обязательно для выбора'),
	dataSource: Yup.array()
		.min(1, 'Минимум 1 индивидуальное задание')
		.max(10, 'Максимум 10 индивидуальных заданий'),
	dataInput: Yup.string()
})

export type INewTaskType = Yup.InferType<typeof NewTaskSchema>

export const NewPracticeSchema = Yup.object({
	practiceType: Yup.string().required('Поле обязательно для выбора'),
	specialtyName: Yup.string().required('Поле обязательно для выбора'),
	dataSource: Yup.array()
		.min(1, 'Минимум 1 индивидуальное задание')
		.max(10, 'Максимум 10 индивидуальных заданий'),
	dataInput: Yup.string(),
	department: Yup.string().required('Поле обязательно для выбора'),
	groupNumber: Yup.string().required('Поле обязательно для выбора'),
	semester: Yup.string().required('Обязательное поле'),
	academicYear: Yup.string().required('Обязательное поле'),
	courseStudy: Yup.string().required('Обязательное поле'),
	totalHours: Yup.string().required('Обязательное поле'),
	practiceStartDate: Yup.date()
		.transform((value, originalValue) => {
			return originalValue ? new Date(originalValue) : null
		})
		.required('Укажите дату'),
	practiceEndDate: Yup.date()
		.transform((value, originalValue) => {
			return originalValue ? new Date(originalValue) : null
		})
		.required('Укажите дату')
})

export type INewPracticeType = Yup.InferType<typeof NewPracticeSchema>
