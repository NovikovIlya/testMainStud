import {RcFile} from "antd/es/upload";

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
    specialtyNameId: number
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
    prolongation: string, //в таблице нет
    endDate: string, //в таблице нет
    specialtyName: string,
    legalFacility: string,
    actualFacility: string,
    placesAmount: string,
    documentCopyId: string,
    documentAgreementId: string
}

interface ColumnsTableFull {
    id: string
    key: string
    contractNumber: string
    contractFacility: string
    conclusionDate: string
    contractType: string
    specialtyName: string
    legalFacility: string
    actualFacility: string
    placesAmount: string,

    contractPeriod: string

    documentCopyId: string,
    documentAgreementId: string
}