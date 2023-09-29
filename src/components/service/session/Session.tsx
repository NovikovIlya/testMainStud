import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { useGetExamsScheduleQuery } from '../../../store/api/serviceApi'

interface DataType {
	employee_id: number
	time_note: string
	building_name: string
	room_num: string
	name: string
	date_note: string
	employee_name: string
}
const columns: ColumnsType<DataType> = [
	{
		title: 'Время',
		dataIndex: 'time_note',
		key: 'time_note',
		render: item => <p className="text-base ">{item}</p>
	},
	{
		title: 'Адрес',
		dataIndex: 'building_name',
		key: 'building_name',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Аудитория',
		dataIndex: 'room_num',
		key: 'room_num',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Предмет',
		key: 'name',
		dataIndex: 'name',
		render: item => <p className="text-base max-w-xs">{item}</p>
	},
	{
		title: 'Дата аттестации',
		key: 'certification',
		dataIndex: 'certification',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Преподаватель',
		key: 'employee_name',
		dataIndex: 'employee_name',
		render: item => <p className="text-base">{item}</p>
	}
]

export const Session = () => {
	const { data: exam } = useGetExamsScheduleQuery()

	return (
		<div>
			<div className="text-black text-3xl font-normal leading-7">
				Расписание сессии
			</div>
			<Table
				columns={columns}
				dataSource={exam}
				pagination={false}
				className=" mt-[50px]  rounded-none max-w-[1300px]"
			/>
		</div>
	)
}
