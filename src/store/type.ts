import {performanceItem} from "../api/types";


export interface InitialState {
	accessToken: string | null
	refreshToken: string | null
	user: User | null
	edit: boolean
}
export type Documentation = {
	links: {
		additionalProp1: Template[]
		additionalProp2: Template[]
		additionalProp3: Template[]
	}
}
export interface DocumentDocumentation {
	links: {
		CorporateNetwork: DocumentLib[]
		YandexServices: DocumentLib[]
		StudentCabinet: DocumentLib[]
	}
}
export type Template = {
	documentName: string
	link: string
}
export interface DocumentLib {
	resourceName: string
	link: string
}
export type Email = {
	id: number
	email: string
	verified: boolean
}
export interface IPerformance {
	journal: performanceItem[]
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
	sunday: Day[]
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
//////////////////////////////////////////////////
export interface ITeacher {
	id: number
	lastname: string
	firstname: string
	middleName: string
}

export interface IListTeacher {
	teachers: ITeacher[]
}

export interface TeacherData {
	id: number,
	lastName: string,
	firstName: string,
	middleName: string,
	post: string,
	subDivision: string,
	photoLink: string
}

export interface Rating {
	kindnessAndTact: number
	appearanceAndDemeanor: number
	generalErudition: number
	punctuality: number
}

export interface UserRating {
	kindnessAndTact: number
}

export interface Total {
	total: number
}

export interface MainTeacherData {
	teacherData: TeacherData
	rating: Rating
	userRating: UserRating
	total: number
}

export interface IValuesAssessment {
	KindnessTact: number
	GeneralErudition: number
	AppearanceDemeanor: number
	Punctuality: number
}

export interface IAssessmentNumber {
	teacherId: number
	questId: number
	answerNumber: number
}

export interface ObjRating {
	rating: Array<IAssessmentNumber>
}

export interface TestQuery {
	rating: ObjRating
	id: number
}
export interface ITask {
	specialityName: string
	practiceType: string
	tasks: string[]
}

export interface ITaskFull extends ITask {
	id: string
}

export interface ContentItem {
	id: string
	specialityName: string
	practiceType: string
	tasks: string[]
}

interface Sort {
	empty: boolean
	sorted: boolean
	unsorted: boolean
}

interface Pageable {
	offset: number
	sort: Sort
	pageNumber: number
	pageSize: number
}

interface ExtendedPageable extends Pageable {
	paged: boolean
	unpaged: boolean
}

export interface IPracticeInfo {
	specialtyName: string
	practiceType: string
	department: string
	groupNumber: string
	semester: number
	academicYear: number
	courseStudy: number
	practiceStartDate: string
	practiceEndDate: string
	totalHours: number
	individualTasks: string
	competence: string
	departmentDirector: string
}

export interface IPracticeInfoFull extends IPracticeInfo {
	id: string
}

export interface IResponse {
	totalPages: number
	totalElements: number
	size: number
	number: number
	sort: Sort
	numberOfElements: number
}

export interface ITasksResponse extends IResponse {
	content: ContentItem[]
	pageable: Pageable
}

export interface IPracticesResponse extends IResponse {
	last: boolean
	first: boolean
	empty: boolean
	pageable: Pageable
	content: IPracticeInfoFull[]
}

export interface IContractsResponse extends IResponse {
	last: boolean
	first: boolean
	empty: boolean
	content: IContractInfoFull[]
	pageable: string
}

export type TypeGetTasks = {
	page: number
	size: number
	sort: string[]
}
export type TypeGetPractices = {
	page: number
	size: number
	sort: string
}

export interface IContractInfo {
	contractNumber: string
	contractFacility: string
	dateConclusionContract: string
	contractType: string
	prolongation: number
	contractTime: string
	specialtyName: string
	legalFacility: string
	actualFacility: string
	placeNumber: number
}

export interface IContractInfoFull extends IContractInfo {
	id: string
}

export interface ICreateContract extends IContractInfo {
	pdfContract: string
	pdfAgreement: string
}

export interface ICreateContractFull extends IContractInfoFull {
	pdfContract: string
	pdfAgreement: string
}

export interface IDocument {
	description: string
}

export interface IDocumentInfo {
	documentId: string
	specialtyCode: string
	specialtyName: string
	firstYear: number
	secondYear: number
	courseNumber: number
	groupNumbers: string
	educationLevel: string
	educationType: string
	educationalOrProductionType: string
	practiceType: string
	practiceStartDate: string
	practiceEndDate: string
}

export interface IDocumentStatus {
	id: string
	description: string
	status: string
}
