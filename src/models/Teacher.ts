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