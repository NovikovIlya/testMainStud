import { Radio, RadioChangeEvent, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'

import { useGetScheduleQuery } from '../../../store/api/serviceApi'

import './StyleSchedule.scss'
import { DataType } from '../../../models/schedule'



const columns: ColumnsType<DataType> = [
	{
		title: '',
		dataIndex: 'type',
		key: 'type',
		render: item => {
			return {
				props: {
					style: {
						background: item === 'black' ? 'red' : '#B3B3B3',
						padding: '0 6.5px 0 6.5px'
					}
				},
				children: <></>
			}
		}
	},
	{
		title: 'Время',
		dataIndex: 'time',
		key: 'time',
		render: item => <p className="text-base whitespace-nowrap">{item}</p>
	},
	{
		title: 'Предмет',
		dataIndex: 'name',
		key: 'name',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Преподаватель',
		dataIndex: 'teacher',
		key: 'teacher',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Корпус',
		key: 'building',
		dataIndex: 'building',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Аудитория',
		key: 'room',
		dataIndex: 'room',
		render: item => <p className="text-base">{item}</p>
	}
]
export const Schedule = () => {
	const { data: schedule, isLoading } = useGetScheduleQuery()
	const [data, setData] = useState<DataType[] | undefined>()
	useEffect(() => {
		setData(schedule?.monday)
	}, [isLoading, schedule])
	if (schedule === undefined) return null

	const onChange = (e: RadioChangeEvent) => {
		//@ts-ignore
		setData(schedule[e.target.value])
	}
	return (
		<div className="mt-14 mx-14 radio">
			<div className="mb-14 text-[28px]">Мое расписание</div>
			<Radio.Group
				onChange={onChange}
				defaultValue="monday"
				buttonStyle="solid"
				className="flex gap-[10px] h-9"
			>
				<Radio.Button
					className="rounded-full bg-transparent h-full flex items-center  text-base"
					value="monday"
				>
					Понедельник
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="tuesday"
				>
					Вторник
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="wednesday"
				>
					Среда
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="thursday"
				>
					Четверг
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="friday"
				>
					Пятница
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="saturday"
				>
					Суббота
				</Radio.Button>
			</Radio.Group>
			<div className="my-10 gap-5 flex">
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
					className="max-w-[1050px] w-full drop--lg -[#d4e3f1] rounded-none"
				/>
				<div className="flex flex-col gap-6 text-sm">
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px]  rounded-full bg-[#A7FAFF]" />
						Потоковая лекция
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#3A92E3]" />
						Лекция
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#FFE24C]" />
						Семинар
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#59C348]" />
						Лабораторное занятие
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#E93A3A]" />
						Факультатив
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#844EC9]" />
						Практика
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#FF9838]" />
						Тестирование
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#B3B3B3]" />
						Тип дисциплины не указан
					</div>
				</div>
			</div>
		</div>
	)
}
