export interface InitialState {
	accessToken: string | null
	refreshToken: string | null
	user: User | null
	edit: boolean
}

export interface User {
	username: string
	firstname: string
	lastname: string
	middlename: string
	birthday: string
	phone: string
	email: string
	citizenship: string
	roles: Role[]
	sessionId: string
	sessionHash: string
	allId: string
}
export type IDocumentsRequest = {
	id: number
	type: string
}
export interface Role {
	login: string
	id: string
	type: string
}
export interface ICalendarItem {
	semester: number
	type_id: number
	type_name: string
	gost_hours: number
	laboratory_hours: number
	total_laboratory_hours: number
	lecture_hours: number
	total_lecture_hours: number
	practice_hours: number
	total_practice_hours: number
	seminar_hours: number
	total_seminar_hours: number
	independent_hours: number
	total_independent_hours: number
	is_exam: boolean
	is_quiz: boolean
	subject_id: number
	subject_name: string
	full_shifr: string
}

export interface ICalendar {
	subjects: ICalendarItem[]
}

interface Day {
	name: string
	time: string
	teacher: string
	teacherId: number
	building: string
	room: string
	type: string
}
export interface Exam {
	building_name: string
	room_num: string
	name: string
	employee_id: number
	employee_name: string
	date_note: string
	time_note: string
}
export type TypeSchedule = {
	monday: Day[]
	tuesday: Day[]
	wednesday: Day[]
	thursday: Day[]
	friday: Day[]
	saturday: Day[]
}
export interface IMe {
	name: string
	surName: string
	patronymic: string
	birthDay: string
	gender: string
	phone: string
	countryId: number
}
