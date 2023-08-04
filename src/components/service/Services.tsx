import { Select, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
	key: string
	division: string
	workingHours: string
	studentAdmissionTime: string
	fullNameManager: string
	contactPhone: string
}
const columns: ColumnsType<DataType> = [
	{
		title: 'Подразделение',
		dataIndex: 'division',
		key: 'division',
		render: item => <p className="text-base max-w-xs">{item}</p>
	},
	{
		title: 'Время работы',
		dataIndex: 'workingHours',
		key: 'workingHours',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Время приема студентов',
		dataIndex: 'studentAdmissionTime',
		key: 'studentAdmissionTime',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'ФИО руководителя',
		key: 'fullNameManager',
		dataIndex: 'fullNameManager',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Контактный телефон',
		key: 'contactPhone',
		dataIndex: 'contactPhone',
		render: item => <p className="text-base">{item}</p>
	}
]
const data: DataType[] = [
	{
		key: '1',
		division:
			'Отдел организации приема абитуриентов и работы с иностранными обучающимися',
		workingHours: '08:00-17:00',
		studentAdmissionTime: '08:00-17:00',
		fullNameManager: 'Быстрова Ирина Васильевна',
		contactPhone: '+7 (843) 224-23-23'
	}
]
export const Services = () => {
	return (
		<div className="mt-14 mx-14">
			<div className="text-black text-3xl font-normal leading-7">
				Расписание служб
			</div>
			<div className="opacity-80 text-black mt-[50px] text-lg font-normal leading-none">
				Выбрать подразделение
			</div>
			<Select
				showSearch
				size="large"
				className="w-[622px] mt-[15px] bg-white rounded border border-black border-opacity-10 placeholder:opacity-50 placeholder:text-black placeholder:text-base placeholder:font-normal leading-none"
				placeholder="Выбрать"
				optionFilterProp="children"
				filterOption={(input, option) => (option?.label ?? '').includes(input)}
				filterSort={(optionA, optionB) =>
					(optionA?.label ?? '')
						.toLowerCase()
						.localeCompare((optionB?.label ?? '').toLowerCase())
				}
				options={[
					{
						value: '1',
						label: 'Not Identified'
					},
					{
						value: '2',
						label: 'Closed'
					},
					{
						value: '3',
						label: 'Communicated'
					},
					{
						value: '4',
						label: 'Identified'
					},
					{
						value: '5',
						label: 'Resolved'
					},
					{
						value: '6',
						label: 'Cancelled'
					}
				]}
			/>
			<Table
				columns={columns}
				dataSource={data}
				pagination={false}
				className=" drop-shadow-lg shadow-[#d4e3f1] rounded-none mt-10"
			/>
		</div>
	)
}
