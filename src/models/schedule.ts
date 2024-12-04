export interface DataType {
	name: string
	time: string
	teacher: string
	teacherId: number
	building: string
	room: string
	type: string
}

export interface DataTypeService {
	key: string
	division: string
	workingHours: string
	studentAdmissionTime: string
	fullNameManager: string
	contactPhone: string
}

export interface OptionSortDate {
    value: string;
    label: string;
}