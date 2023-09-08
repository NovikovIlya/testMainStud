import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React from 'react'

import {
	useCalendarQuery,
	useExamsScheduleQuery
} from '../../../store/slice/scheduleSlice'

interface DataType {
	key: string
	time: string
	address: string
	lecture: string
	subject: string
	certification: string
	teacher: string
}
const columns: ColumnsType<DataType> = [
	{
		title: 'Время',
		dataIndex: 'time',
		key: 'time',
		render: item => <p className="text-base ">{item}</p>
	},
	{
		title: 'Адрес',
		dataIndex: 'address',
		key: 'address',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Аудитория',
		dataIndex: 'lecture',
		key: 'lecture',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Предмет',
		key: 'subject',
		dataIndex: 'subject',
		render: item => <p className="text-base max-w-xs">{item}</p>
	},
	{
		title: 'Форма аттестации',
		key: 'certification',
		dataIndex: 'certification',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Преподаватель',
		key: 'teacher',
		dataIndex: 'teacher',
		render: item => <p className="text-base">{item}</p>
	}
]
const data: DataType[] = [
	{
		key: '1',
		time: '08:00',
		address: 'Корпус 2, ул. Астрономическая, д.5',
		lecture: '109',
		subject: 'Общая биология: тренинг по саморазвитию и планированию карьеры',
		certification: 'Зачет',
		teacher: 'Малютина Л.В.'
	},
	{
		key: '2',
		time: '08:00',
		address: 'Корпус 2, ул. Астрономическая, д.5',
		lecture: '109',
		subject: 'Общая биология: тренинг по саморазвитию и планированию карьеры',
		certification: 'Зачет',
		teacher: 'Малютина Л.В.'
	},
	{
		key: '3',
		time: '08:00',
		address: 'Корпус 2, ул. Астрономическая, д.5',
		lecture: '109',
		subject: 'Общая биология: тренинг по саморазвитию и планированию карьеры',
		certification: 'Зачет',
		teacher: 'Малютина Л.В.'
	},
	{
		key: '4',
		time: '08:00',
		address: 'Корпус 2, ул. Астрономическая, д.5',
		lecture: '109',
		subject: 'Общая биология: тренинг по саморазвитию и планированию карьеры',
		certification: 'Зачет',
		teacher: 'Малютина Л.В.'
	},
	{
		key: '5',
		time: '08:00',
		address: 'Корпус 2, ул. Астрономическая, д.5',
		lecture: '109',
		subject: 'Общая биология: тренинг по саморазвитию и планированию карьеры',
		certification: 'Зачет',
		teacher: 'Малютина Л.В.'
	}
]

export const Session = () => {
	const { data: schedule, isLoading } = useExamsScheduleQuery()
	console.log(schedule)

	return (
		<div>
			<div className="text-black text-3xl font-normal leading-7">
				Расписание сессии
			</div>
			<Table
				columns={columns}
				dataSource={data}
				pagination={false}
				className="drop-shadow-lg mt-[50px] shadow-[#d4e3f1] rounded-none max-w-[1300px]"
			/>
		</div>
	)
}
