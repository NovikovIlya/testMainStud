export interface DataType {
	key: string
	mainColumn: string
	beginFirstTerm: string
	endFirstTerm: string
	termFirstWeek: string
	beginSecondTerm: string
	endSecondTerm: string
	termSecondWeek: string
}

export interface DataTypeSession {
	employee_id: number
	time_note: string
	building_name: string
	room_num: string
	name: string
	date_note: string
	employee_name: string
}