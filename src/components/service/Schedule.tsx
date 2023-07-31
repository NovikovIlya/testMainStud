import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React from 'react'

import { Layout } from './Layout'
import './StyleShedule.scss'

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
		className: 'w-[8px]',
		render: item => {
			return {
				props: {
					style: {
						background: item === 'black' ? 'red' : '#B3B3B3',
						width: '8px'
					}
				},
				children: <></>
			}
		}
	},
	{
		title: 'Время',
		dataIndex: 'time',
		key: 'time'
	},
	{
		title: 'Предмет',
		dataIndex: 'subject',
		key: 'subject'
	},
	{
		title: 'Преподаватель',
		dataIndex: 'teacher',
		key: 'teacher'
	},
	{
		title: 'Корпус',
		key: 'body',
		dataIndex: 'body'
	},
	{
		title: 'Аудитория',
		key: 'lecture',
		dataIndex: 'lecture'
	}
]
const data: DataType[] = [
	{
		key: '1',
		time: '10:10-11:40',
		subject: 'Элективные курсы по физической культуре и спорту',
		teacher: 'Малютина Л.В.',
		body: 'Спортивный комплекс Бустан',
		lecture: 'спортивный зал'
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
		teacher: 'Малютина Л.В.',
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
	},
	{
		key: '6',
		time: '10:10-11:40',
		subject: 'Элективные курсы по физической культуре и спорту',
		teacher: 'Малютина Л.В.',
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
	},
	{
		key: '6',
		time: '10:10-11:40',
		subject: 'Элективные курсы по физической культуре и спорту',
		teacher: 'Малютина Л.В.',
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
	},
	{
		key: '6',
		time: '10:10-11:40',
		subject: 'Элективные курсы по физической культуре и спорту',
		teacher: 'Малютина Л.В.',
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
		<Layout>
			<div className="mt-14 mx-14">
				<div className="mb-14 text-[28px]">Мое расписание</div>
				<Radio.Group
					onChange={onChange}
					defaultValue="a"
					buttonStyle="solid"
					className="flex gap-2"
				>
					<Radio.Button className="rounded-full" value="a">
						Понедельник
					</Radio.Button>
					<Radio.Button className="rounded-full" value="b">
						Вторник
					</Radio.Button>
					<Radio.Button className="rounded-full" value="c">
						Среда
					</Radio.Button>
					<Radio.Button className="rounded-full" value="d">
						Четверг
					</Radio.Button>
					<Radio.Button className="rounded-full" value="f">
						Пятница
					</Radio.Button>
					<Radio.Button className="rounded-full" value="g">
						Суббота
					</Radio.Button>
				</Radio.Group>
				<div className="my-10 max-w-[1050px]">
					<Table columns={columns} dataSource={data} pagination={false} />
				</div>
			</div>
		</Layout>
	)
}
