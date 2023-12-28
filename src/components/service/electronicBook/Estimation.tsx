import { Radio, RadioChangeEvent, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'

interface DataType {
	key: string
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
interface DateSemester {
	key: string
	term: number
	semesterRating: number
	place: number
	placeInstitute: number
}
const columnSemester: ColumnsType<DateSemester> = [
	{
		title: 'Семестр',
		dataIndex: 'term',
		key: 'term',
		render: item => <p className="text-base max-w-xs">{item}</p>
	},
	{
		title: 'Семестровый рейтинг',
		dataIndex: 'semesterRating',
		key: 'semesterRating',
		render: item => <p className="text-base max-w-xs">{item}</p>
	},
	{
		title: 'Место в группе',
		dataIndex: 'place',
		key: 'place',
		render: item => <p className="text-base max-w-xs">{item}</p>
	},
	{
		title: 'Место в институте по курсу',
		dataIndex: 'placeInstitute',
		key: 'placeInstitute',
		render: item => <p className="text-base max-w-xs">{item}</p>
	}
]
const dataSemester: DateSemester[] = [
	{
		key: '1',
		term: 1,
		semesterRating: 78.8,
		place: 15,
		placeInstitute: 720
	},
	{
		key: '2',
		term: 2,
		semesterRating: 0,
		place: 38,
		placeInstitute: 700
	}
]
const columns: ColumnsType<DataType> = [
	{
		title: 'Семестр',
		dataIndex: 'term',
		key: 'term',
		render: item => <p className="text-base max-w-xs">{item}</p>
	},
	{
		title: 'Дисциплина',
		dataIndex: 'discipline',
		key: 'discipline',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Балл за работу в семестре',
		dataIndex: 'scoreSemester',
		key: 'scoreSemester',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Тип',
		key: 'type',
		dataIndex: 'type',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Полученный балл',
		key: 'scoreReceived',
		dataIndex: 'scoreReceived',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Дата сдачи',
		key: 'dateDelivery',
		dataIndex: 'dateDelivery',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Итоговый балл',
		key: 'finalScore',
		dataIndex: 'finalScore',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Итоговая оценка',
		key: 'finalAssessment',
		dataIndex: 'finalAssessment',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Академические часы',
		key: 'academicHours',
		dataIndex: 'academicHours',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Зачетные единицы',
		key: 'credits',
		dataIndex: 'credits',
		render: item => <p className="text-base">{item}</p>
	}
]
const data: DataType[] = [
	{
		key: '1',
		term: 1,
		discipline: 'Ботаника',
		scoreSemester: 36,
		type: 'экз.',
		scoreReceived: 45,
		dateDelivery: '17.01.2023',
		finalScore: 81,
		finalAssessment: 'хор.',
		academicHours: 180,
		credits: 5
	},
	{
		key: '2',
		term: 1,
		discipline: 'Ботаника',
		scoreSemester: 36,
		type: 'экз.',
		scoreReceived: 45,
		dateDelivery: '17.01.2023',
		finalScore: 81,
		finalAssessment: 'хор.',
		academicHours: 180,
		credits: 5
	},
	{
		key: '3',
		term: 1,
		discipline: 'Ботаника',
		scoreSemester: 36,
		type: 'экз.',
		scoreReceived: 45,
		dateDelivery: '17.01.2023',
		finalScore: 81,
		finalAssessment: 'хор.',
		academicHours: 180,
		credits: 5
	},
	{
		key: '4',
		term: 1,
		discipline: 'Ботаника',
		scoreSemester: 36,
		type: 'экз.',
		scoreReceived: 45,
		dateDelivery: '17.01.2023',
		finalScore: 81,
		finalAssessment: 'хор.',
		academicHours: 180,
		credits: 5
	}
]
export const Estimation = () => {
	const [semester, setSemester] = useState(0)
	const onChange = (e: RadioChangeEvent) => {
		setSemester(e.target.value)
	}
	return (
		<div className="mt-14 mx-14 radio">
			<div className="mb-14 text-[28px]">Расписание сессии</div>
			<Radio.Group
				defaultValue="0"
				onChange={onChange}
				buttonStyle="solid"
				className="flex gap-[10px] h-9"
			>
				<Radio.Button
					className="rounded-full bg-transparent h-full flex items-center  text-base"
					value="0"
				>
					все курсы
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="1"
				>
					1 курс
				</Radio.Button>
			</Radio.Group>
			<div className="my-10 gap-5 flex flex-col">
				{semester === 1 && (
					<Table
						dataSource={dataSemester}
						columns={columnSemester}
						pagination={false}
						className=" w-full drop-shadow-lg shadow-[#d4e3f1] rounded-none"
					/>
				)}
				<Table
					dataSource={data}
					columns={columns}
					pagination={false}
					className=" w-full drop-shadow-lg shadow-[#d4e3f1] rounded-none"
				/>
			</div>
		</div>
	)
}
