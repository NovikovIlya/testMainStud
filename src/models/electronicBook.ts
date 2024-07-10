export interface IRatingTeacher {
    kindnessAndTact: number | undefined
    generalErudition: number | undefined
    appearanceAndDemeanor: number | undefined
    punctuality: number | undefined
    total: number | undefined
    disabledButton: boolean
    sendData: boolean
}

export interface DataType {
	key: number
	term: number
	discipline: string
	scoreSemester: number
	type: string
	scoreReceived: number
	dateDelivery: string
	finalScore: number
	finalAssessment: string
	academicHours: number
	credits: number
}
export interface DateSemester {
	key: string
	term: number
	semesterRating: number
	place: number
	placeInstitute: number
}