import { Radio, Table } from 'antd'
import type { RadioChangeEvent } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Column from 'antd/es/table/Column'
import ColumnGroup from 'antd/es/table/ColumnGroup'
import React from 'react'

import { useCalendarQuery } from '../../../store/slice/scheduleSlice'

import Styles from './Curriculum.module.scss'

interface DataType {
	key: string
	mainColumn: string
	beginFirstTerm: string
	endFirstTerm: string
	termFirstWeek: string
	beginSecondTerm: string
	endSecondTerm: string
	termSecondWeek: string
}

const dataExam: DataType[] = [
	{
		key: '1',
		mainColumn: 'Теоретическое обучение',
		beginFirstTerm: '1 сентября',
		endFirstTerm: '1 сентября',
		termFirstWeek: '24',
		beginSecondTerm: '1 сентября',
		endSecondTerm: '1 сентября',
		termSecondWeek: '24'
	},
	{
		key: '2',
		mainColumn: 'Теоретическое обучение',
		beginFirstTerm: '1 сентября',
		endFirstTerm: '1 сентября',
		termFirstWeek: '24',
		beginSecondTerm: '1 сентября',
		endSecondTerm: '1 сентября',
		termSecondWeek: '24'
	},
	{
		key: '3',
		mainColumn: 'Теоретическое обучение',
		beginFirstTerm: '1 сентября',
		endFirstTerm: '1 сентября',
		termFirstWeek: '24',
		beginSecondTerm: '1 сентября',
		endSecondTerm: '1 сентября',
		termSecondWeek: '24'
	},
	{
		key: '4',
		mainColumn: 'Теоретическое обучение',
		beginFirstTerm: '1 сентября',
		endFirstTerm: '1 сентября',
		termFirstWeek: '24',
		beginSecondTerm: '1 сентября',
		endSecondTerm: '1 сентября',
		termSecondWeek: '24'
	},
	{
		key: '5',
		mainColumn: 'Теоретическое обучение',
		beginFirstTerm: '1 сентября',
		endFirstTerm: '1 сентября',
		termFirstWeek: '24',
		beginSecondTerm: '1 сентября',
		endSecondTerm: '1 сентября',
		termSecondWeek: '24'
	}
]

type TypeColumn = {
	type_name: string
	total: number
	totalGost: number
	totalLectures: number
	lecturesLectures: number
	practiceLectures: number
	laboratoryLectures: number
	independent: number
	control: number
	lecturesFirstSemester: number
	practiceFirstSemester: number
	laboratoryFirstSemester: number
	examFirstSemester: string
	creditsFirstSemester: string
	lecturesSecondSemester: number
	practiceSecondSemester: number
	laboratorySecondSemester: number
	examSecondSemester: string
	creditsSecondSemester: string
}

const columns: ColumnsType<TypeColumn> = [
	{
		title: (
			<p className="h-[190px] flex items-center justify-center whitespace-normal min-w-[500px]">
				Название дисциплины
			</p>
		),
		dataIndex: 'type_name',
		key: 'type_name',
		width: 580,
		onCell: (_, index) => ({
			colSpan: index === 1 ? 19 : 1
		})
	},
	{
		title: <p className="rotate">Всего</p>,
		dataIndex: 'total',
		key: 'total',
		align: 'center',
		width: 32,
		onCell: (_, index) => {
			if (index === 1) return { colSpan: 0 }
			else return {}
		}
	},
	{
		title: <p className="rotate whitespace-nowrap">Всего по ГОСТу</p>,
		dataIndex: 'totalGost',
		key: 'totalGost',
		align: 'center',
		width: 32,
		onCell: (_, index) => {
			if (index === 1) return { colSpan: 0 }
			else return {}
		}
	},
	{
		title: (
			<>
				<p className="absolute bottom-8">Лекционных</p>
			</>
		),

		children: [
			{
				title: <p className="rotate bottom-[-28px]">Всего</p>,
				dataIndex: 'totalLectures',
				key: 'totalLectures',
				align: 'center',
				width: 32,
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			},
			{
				title: <p className="rotate bottom-[-28px]">Лекционных</p>,
				dataIndex: 'lecturesLectures',
				key: 'lecturesLectures',
				align: 'center',
				width: 32,
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			},
			{
				title: <p className="rotate bottom-[-28px]">Практических</p>,
				dataIndex: 'practiceLectures',
				key: 'practiceLectures',
				align: 'center',
				width: 32,
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			},
			{
				title: <p className="rotate bottom-[-28px]">Лабораторных</p>,
				dataIndex: 'laboratoryLectures',
				key: 'laboratoryLectures',
				align: 'center',
				width: 32,
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			}
		]
	},
	{
		title: <p className="rotate">Самостоятельных</p>,
		dataIndex: 'independent',
		key: 'independent',
		align: 'center',
		width: 32,
		onCell: (_, index) => {
			if (index === 1) return { colSpan: 0 }
			else return {}
		}
	},
	{
		title: <p className="rotate">Контрольных</p>,
		dataIndex: 'control',
		key: 'control',
		align: 'center',
		width: 32,
		onCell: (_, index) => {
			if (index === 1) return { colSpan: 0 }
			else return {}
		}
	},
	{
		title: (
			<>
				<p className="absolute bottom-8">1 курс - 1 семестр</p>
			</>
		),

		children: [
			{
				title: <p className="rotate bottom-[-28px]">Лекционных</p>,
				dataIndex: 'lecturesFirstSemester',
				key: 'lecturesFirstSemester',
				align: 'center',
				width: 32,
				render: item => {
					return {
						props: {
							style: {
								background: '#E6F4FF'
							}
						},
						children: <>{item}</>
					}
				},
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			},
			{
				title: <p className="rotate bottom-[-28px]">Практических</p>,
				dataIndex: 'practiceFirstSemester',
				key: 'practiceFirstSemester',
				align: 'center',
				width: 32,
				render: item => {
					return {
						props: {
							style: {
								background: '#E6F4FF'
							}
						},
						children: <>{item}</>
					}
				},
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			},
			{
				title: <p className="rotate bottom-[-28px]">Лабораторных</p>,
				dataIndex: 'laboratoryFirstSemester',
				key: 'laboratoryFirstSemester',
				align: 'center',
				width: 32,
				render: item => {
					return {
						props: {
							style: {
								background: '#E6F4FF'
							}
						},
						children: <>{item}</>
					}
				},
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			},
			{
				title: <p className="rotate bottom-[-28px]">Экзамены</p>,
				dataIndex: 'examFirstSemester',
				key: 'examFirstSemester',
				align: 'center',
				width: 32,
				render: item => {
					return {
						props: {
							style: {
								background: '#C4E4FC'
							}
						},
						children: <>{item}</>
					}
				},
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			},
			{
				title: <p className="rotate bottom-[-28px]">Зачеты</p>,
				dataIndex: 'creditsFirstSemester',
				key: 'creditsFirstSemester',
				align: 'center',
				width: 32,
				render: item => {
					return {
						props: {
							style: {
								background: '#C4E4FC'
							}
						},
						children: <>{item}</>
					}
				},
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			}
		]
	},
	{
		title: (
			<>
				<p className="absolute bottom-8">1 курс - 2 семестр</p>
			</>
		),

		children: [
			{
				title: <p className="rotate bottom-[-28px]">Лекционных</p>,
				dataIndex: 'lecturesSecondSemester',
				key: 'lecturesSecondSemester',
				align: 'center',
				width: 32,
				render: item => {
					return {
						props: {
							style: {
								background: '#E6F4FF'
							}
						},
						children: <>{item}</>
					}
				},
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			},
			{
				title: <p className="rotate bottom-[-28px]">Практических</p>,
				dataIndex: 'practiceSecondSemester',
				key: 'practiceSecondSemester',
				align: 'center',
				width: 32,
				render: item => {
					return {
						props: {
							style: {
								background: '#E6F4FF'
							}
						},
						children: <>{item}</>
					}
				},
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			},
			{
				title: <p className="rotate bottom-[-28px]">Лабораторных</p>,
				dataIndex: 'laboratorySecondSemester',
				key: 'laboratorySecondSemester',
				align: 'center',
				width: 32,
				render: item => {
					return {
						props: {
							style: {
								background: '#E6F4FF'
							}
						},
						children: <>{item}</>
					}
				},
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			},
			{
				title: <p className="rotate bottom-[-28px]">Экзамены</p>,
				dataIndex: 'examSecondSemester',
				key: 'examSecondSemester',
				align: 'center',
				width: 32,
				render: item => {
					return {
						props: {
							style: {
								background: '#C4E4FC'
							}
						},
						children: <>{item}</>
					}
				},
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			},
			{
				title: <p className="rotate bottom-[-28px]">Зачеты</p>,
				dataIndex: 'creditsSecondSemester',
				key: 'creditsSecondSemester',
				width: 32,
				align: 'center',
				render: item => {
					return {
						props: {
							style: {
								background: '#C4E4FC'
							}
						},
						children: <>{item}</>
					}
				},
				onCell: (_, index) => {
					if (index === 1) return { colSpan: 0 }
					else return {}
				}
			}
		]
	}
]
export const Curriculum = () => {
	const { data: schedule, isLoading } = useCalendarQuery()
	console.log(schedule)

	const onChange = (e: RadioChangeEvent) => {
		console.log([e.target.value])
	}
	const data: TypeColumn[] = [
		{
			control: 0,
			type_name: 'Иностранный язык',
			independent: 34,
			total: 198,
			totalGost: 216,
			totalLectures: 164,
			lecturesLectures: 0,
			practiceLectures: 164,
			laboratoryLectures: 0,
			lecturesFirstSemester: 0,
			practiceFirstSemester: 0,
			laboratoryFirstSemester: 0,
			examFirstSemester: '',
			creditsFirstSemester: '+',
			lecturesSecondSemester: 0,
			practiceSecondSemester: 0,
			laboratorySecondSemester: 0,
			examSecondSemester: '',
			creditsSecondSemester: '+'
		}
	]
	return (
		<div className="radio ">
			<div className="text-black text-3xl font-normal leading-7 mb-10">
				Учебный план
			</div>
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
					1 курс
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="tuesday"
				>
					2 курс
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="wednesday"
				>
					3 курс
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="thursday"
				>
					4 курс
				</Radio.Button>
			</Radio.Group>
			<Table
				bordered
				dataSource={data}
				scroll={{ x: 500 }}
				columns={columns}
				className="max-w-[1250px] w-full mt-10"
			/>

			<Table
				dataSource={dataExam}
				pagination={false}
				className="my-[50px] max-w-[1000px] rounded-none border-[2px] shadow-[#d4e3f1] drop-shadow-lg;"
				bordered
			>
				<Column title="" dataIndex="mainColumn" key="mainColumn"></Column>
				<ColumnGroup title="1 семестр">
					<Column
						title="Начало"
						dataIndex="beginFirstTerm"
						key="beginFirstTerm"
					/>
					<Column
						title="Окончание"
						dataIndex="endFirstTerm"
						key="endFirstTerm"
					/>
					<Column
						title="Неделя"
						dataIndex="termFirstWeek"
						key="termFirstWeek"
					/>
				</ColumnGroup>
				<ColumnGroup title="2 семестр">
					<Column
						title="Начало"
						dataIndex="beginSecondTerm"
						key="beginSecondTerm"
					/>
					<Column
						title="Окончание"
						dataIndex="endSecondTerm"
						key="endSecondTerm"
					/>
					<Column
						title="Неделя"
						dataIndex="termSecondWeek"
						key="termSecondWeek"
					/>
				</ColumnGroup>
			</Table>
		</div>
	)
}
