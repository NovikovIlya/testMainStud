import { Radio, RadioChangeEvent, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'

import { useGetScheduleQuery } from '../../../store/api/serviceApi'

import './StyleSchedule.scss'
import { DataType } from '../../../models/schedule'
import useWindowOrientation from '../../../utils/hooks/useDeviceOrientation'
import { isMobileDevice } from '../../../utils/hooks/useIsMobile'
import { t } from 'i18next'





export const Schedule = () => {
	const { data: schedule, isLoading } = useGetScheduleQuery()
	const [data, setData] = useState<DataType[] | undefined>()
	const isMobile = isMobileDevice()
	const orientation  = useWindowOrientation()
	const columns: ColumnsType<DataType> = [
		{
			title: '',
			dataIndex: 'type',
			key: 'type',
			className: '',
			render: (item, item2) => {
				return (
				  <div className={` ${isMobile ? 'hidden' : ''} !h-[105px] w-[32px] ${
					item2.type === 'Практика' ? 'bg-[#844EC9]' :
					item2.type === 'Потоковая лекция' ? 'bg-[#A7FAFF]' :
					item2.type === 'Лекция' ? 'bg-[#3A92E3]' :
					item2.type === 'Семинар' ? 'bg-[#FFE24C]' :
					item2.type === 'Лабораторное занятие' ? 'bg-[#59C348]' :
					item2.type === 'Факультатив' ? 'bg-[#E93A3A]' :
					item2.type === 'Тестирование' ? 'bg-[#FF9838]' :
					'bg-[#B3B3B3]' // Default case for "Тип дисциплины не указан"
				  }`}></div>
				)
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

	useEffect(() => {
		setData(schedule?.monday)
	}, [isLoading, schedule])
	

	const onChange = (e: RadioChangeEvent) => {
		//@ts-ignore
		setData(schedule[e.target.value])
	}

	if (schedule === undefined) return null

	if(isMobile && orientation === 'portrait') return <div className='max-w-full text-center mt-10'>В данном разрешении модуль не работает, пожалуйста поверните телефон</div>

	return (
		<div className={`${isMobile ? 'mx-0' : 'mx-14'} mt-14  radio`}>
			{/* <div className="mb-14 text-[28px]">Мое расписание</div> */}
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
					{t('monday')}
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="tuesday"
				>
					{t('tuesday')}
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="wednesday"
				>
					{t('wednesday')}
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="thursday"
				>
					{t('thursday')}
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="friday"
				>
					{t('friday')}
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="saturday"
				>
					{t('saturday')}
				</Radio.Button>
			</Radio.Group>
			<div className="my-10 gap-5 flex">
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
					className="max-w-[1050px] w-full drop--lg -[#d4e3f1] rounded-none"
				/>
				<div className={`${isMobile? 'hidden' :''} flex flex-col gap-6 text-sm`}>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px]  rounded-full bg-[#A7FAFF]" />
						{t('streamingLecture')}
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#3A92E3]" />
						{t('lecture')}
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#FFE24C]" />
						{t('seminar')}
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#59C348]" />
						{t('laboratory')}
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#E93A3A]" />
						{t('elective')}
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#844EC9]" />
						{t('practice')}
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#FF9838]" />
						{t('exam')}
					</div>
					<div className="flex items-center gap-2">
						<div className="min-w-3 min-h-3 w-[11px] h-[11px] rounded-full bg-[#B3B3B3]" />
						{t('notExam')}
					</div>
				</div>
			</div>
		</div>
	)
}
