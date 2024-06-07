import {RcFile} from "antd/es/upload";
import {string} from "yup";

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
    key: string
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
    ITN: string
    contractNumber: string
    contractFacility: string
    conclusionDate: string
    contractType: string
    prolongation: string
    endDate: string
    specialtyNameId: number | string
    legalFacility: string
    actualFacility: string
    placesAmount: string
}

export interface IContractInfoFull extends IContractInfo {
    id: string
}

export interface ICreateContract extends IContractInfo {
    pdfContract: Blob
    pdfAgreement: Blob
}

////////////////////////////////////
export interface ResponseEditContract {
    id: string
    itn: string
    contractNumber: string
    contractFacility: string
    conclusionDate: string
    contractType: string
    prolongation: string
    endDate: string
    specialtyName: number
    legalFacility: string
    actualFacility: string
    placesAmount: string
    documentCopyId: string
    documentAgreementId: string
}

///////////////////////////////////////////

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

export interface ContractsAll {
    id: string,
    contractNumber: string,
    contractFacility: string,
    conclusionDate: string,
    contractType: string,
    prolongation: string,
    endDate: string,
    specialtyName: string,
    legalFacility: string,
    actualFacility: string,
    placesAmount: string,
    documentCopyId: string,
    documentAgreementId: string
}

export interface ContractShort {
    id: string
    contractFacility: string
    fillingDate: string
    contractType: string
    conclusionDate: string
}

export interface NameSpecialty {
    id: number
    value: string
    label: string
}

export interface ContractFacilities {
    value: string
    label: string
}

export interface ListIdDeleteContracts {
    listIdDelete: string[]
}

export interface TaskSend {
    specialityNameId: string
    practiceTypeId: string
    subdivisionNameId: string
    tasks: string[]
}

export interface TaskEdit extends TaskSend {
    id: string
}

export interface OneTask {
    id: string,
    taskDescription: string
}

export interface TasksAll {
    id: string,
    key: string,
    specialityName: string,
    practiceType: string,
    subdivisionName: string,
    dateFilling: string,
    tasks: OneTask[]
}

export interface OneTaskForm {
    task: string
}

export interface Task {
    subDivision: string
    specialityName: string
    practiceType: string
    tasks: OneTaskForm[]
}

export interface ListIdDeleteTasks {
    listIdDelete: string[]
}

export interface PracticeType {
    id: string
    value: string
    label: string
}

export interface Department {
    id: string
    value: string
    label: string
}

export interface NewDepartment {
    id: string
    value: string
    label: string
    responses?: Array<Department>
}

export interface OneCodeCompetence {
    codeCompetence: string
}

export interface NewPractice {
    specialityName: string
    practiceType: string
    department: string
    groupNumber: string
    semester: string
    academicYear: string
    courseStudy: string
    startStudy: string
    amountHours: string
    endStudy: string
    tasks: OneTaskForm[]
    codeCompetencies: OneCodeCompetence[]
    director: string
}

export interface AcademicYear {
    start: string
    end: string
}

export interface NewPracticeSend {
    specialityName: string
    practiceType: string
    department: string
    groupNumber: string
    semester: string
    academicYear: AcademicYear
    courseStudy: string
    startStudy: string
    amountHours: string
    endStudy: string
    tasks: string[]
    codeCompetencies: string[]
    director: string
}

export interface TwoId {
    sp_name_id: number | null
    practice_type_id: number | null
}

export interface Departments {
    id: number,
    value: string,
    label: string,
    responses?: string[]
}