import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import './StyleSchedule.scss'

interface DataType {
	key: string
	time: string
	subject: string
	teacher: string
	body: string
	lecture: string
	color?: string
}
const columns: ColumnsType<DataType> = [
	{
		title: '',
		dataIndex: 'color',
		key: 'color',
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
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Предмет',
		dataIndex: 'subject',
		key: 'subject',
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
		key: 'body',
		dataIndex: 'body',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Аудитория',
		key: 'lecture',
		dataIndex: 'lecture',
		render: item => <p className="text-base">{item}</p>
	}
]
const data: DataType[] = [
	{
		key: '1',
		time: '10:10-11:40',
		subject: 'Элективные курсы по физической культуре и спорту',
		teacher: 'Малютина Л.В.',
		body: 'Спортивный комплекс Бустан',
		lecture: 'спортивный зал',
		color: 'black'
	},
	{
		key: '2',
		time: '10:10-11:40',
		subject: 'Элективные курсы по физической культуре и спорту',
		teacher: 'Малютина Л.В.',
		body: 'Спортивный комплекс Бустан',
		lecture: 'спортивный зал'
	},
	{
		key: '3',
		time: '10:10-11:40',
		subject: 'Элективные курсы по физической культуре и спорту',
		teacher: 'Малютина Л.В.',
		body: 'Спортивный комплекс Бустан',
		lecture: 'спортивный зал'
	},
	{
		key: '4',
		time: '10:10-11:40',
		subject: 'Элективные курсы по физической культуре и спорту',
		teacher: 'Малютина Л.В.',
		body: 'Спортивный комплекс Бустан',
		lecture: 'спортивный зал'
	},
	{
		key: '5',
		time: '10:10-11:40',
		subject: 'Элективные курсы по физической культуре и спорту',
		teacher: 'Малютина Л.В.',
		body: 'Спортивный комплекс Бустан',
		lecture: 'спортивный зал'
	},
	{
		key: '6',
		time: '10:10-11:40',
		subject: 'Элективные курсы по физической культуре и спорту',
		teacher: 'Малютина Л.В.Малютина Л.В.Малютина Л.В.',
		body: 'Спортивный комплекс Бустан',
		lecture: 'спортивный зал'
	},
	{
		key: '7',
		time: '10:10-11:40',
		subject: 'Элективные курсы по физической культуре и спорту',
		teacher: 'Малютина Л.В.',
		body: 'Спортивный комплекс Бустан',
		lecture: 'спортивный зал'
	}
]
export const Schedule = () => {
	const onChange = (e: RadioChangeEvent) => {
		console.log(`radio checked:${e.target.value}`)
	}
	return (
		<div className="mt-14 mx-14 radio">
			<div className="mb-14 text-[28px]">Мое расписание</div>
			<Radio.Group
				onChange={onChange}
				defaultValue="a"
				buttonStyle="solid"
				className="flex gap-[10px] h-9"
			>
				<Radio.Button
					className="rounded-full h-full flex items-center  text-base"
					value="a"
				>
					Понедельник
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base"
					value="b"
				>
					Вторник
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base"
					value="c"
				>
					Среда
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base"
					value="d"
				>
					Четверг
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base"
					value="f"
				>
					Пятница
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base"
					value="g"
				>
					Суббота
				</Radio.Button>
			</Radio.Group>
			<div className="my-10 gap-5 flex">
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
					className="max-w-[1050px] drop-shadow-lg shadow-[#d4e3f1] rounded-none"
				/>
				<div className="flex flex-col gap-6 text-sm">
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-3 h-3  rounded-full bg-[#A7FAFF]" />
						Потоковая лекция
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-3 h-3 rounded-full bg-[#3A92E3]" />
						Лекция
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-3 h-3 rounded-full bg-[#FFE24C]" />
						Семинар
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-3 h-3 rounded-full bg-[#59C348]" />
						Лабораторное занятие
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-3 h-3 rounded-full bg-[#E93A3A]" />
						Факультатив
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-3 h-3 rounded-full bg-[#844EC9]" />
						Практика
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-3 h-3 rounded-full bg-[#FF9838]" />
						Тестирование
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-3 h-3 rounded-full bg-[#B3B3B3]" />
						Тип дисциплины не указан
					</div>
				</div>
			</div>
		</div>
	)
}
