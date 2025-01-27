import { Radio, RadioChangeEvent, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import './StyleSchedule.scss'
import { t } from 'i18next'



export const TableSchedule = ({schedule,isFetching}:any) => {
	const [data, setData] = useState<any>()
	const [radio,setRadio] = useState('monday')
	const columns: any = [
		{
			title: '',
			dataIndex: 'type',
			key: 'type',
			className: '',
			render: (item:any, item2:any) => {
				console.log('item2',item2)
				return (
				  <div className={` $ !h-[105px] w-[32px] ${
					item2?.subject_kind_name === 'Практика' ? 'bg-[#844EC9]' :
					item2?.subject_kind_name === 'Потоковая лекция' ? 'bg-[#A7FAFF]' :
					item2?.subject_kind_name === 'Лекция' ? 'bg-[#3A92E3]' :
					item2?.subject_kind_name === 'Семинар' ? 'bg-[#FFE24C]' :
					item2?.subject_kind_name === 'Лабораторное занятие' ? 'bg-[#59C348]' :
					item2?.subject_kind_name === 'Факультатив' ? 'bg-[#E93A3A]' :
					item2?.subject_kind_name === 'Тестирование' ? 'bg-[#FF9838]' :
					'bg-[#B3B3B3]' // Default case for "Тип дисциплины не указан"
				  }`}></div>
				)
			  }
			  
		},
		{
			title: t('time'),
			dataIndex: 'total_time_schedule',
			key: 'time',
			render: (item:any) => <p className="text-base whitespace-nowrap">{item}</p>
		},
		{
			title: 'Период',
			dataIndex: 'total_time_schedule',
			key: 'time',
			render: (item:any,array:any) => <p className="text-base whitespace-nowrap">{array?.start_day_schedule ? `${array?.start_day_schedule} - ${array?.finish_day_schedule}` : ''}</p>
		},
		{
			title: t('lesson'),
			dataIndex: 'subject_name',
			key: 'name',
			render: (item:any) => <p className="text-base">{item}</p>
		},
		{
			title: t('group'),
			dataIndex: 'group_list',
			key: 'teacher',
			render: (item:any) => <p className="text-base">{item}</p>
		},
		{
			title: t('campus'),
			key: 'building',
			dataIndex: 'building_id',
			render: (item:any) => <p className="text-base">{item}</p>
		},
		{
			title: t('auditorium'),
			key: 'num_auditorium_schedule',
			dataIndex: 'num_auditorium_schedule',
			render: (item:any) => <p className="text-base">{item}</p>
		}
	]

	useEffect(() => {
		if(schedule){
			const filteredData = schedule?.filter((item: any) => {
				switch (radio) {
					case 'monday': return item.day_week_schedule === 1
					case 'tuesday': return item.day_week_schedule === 2
					case 'wednesday': return item.day_week_schedule === 3
					case 'thursday': return item.day_week_schedule === 4
					case 'friday': return item.day_week_schedule === 5
					case 'saturday': return item.day_week_schedule === 6
					default: return true
				}
			})
			setData(filteredData)
		}
		
	}, [isFetching, schedule])
	

	const onChange = (e: RadioChangeEvent) => {
		console.log('e', e)
		const radioBtn = e.target.value
		setRadio(e.target.value)

		const filteredData = schedule?.filter((item: any) => {
			switch (radioBtn) {
				case 'monday': return item.day_week_schedule === 1
				case 'tuesday': return item.day_week_schedule === 2
				case 'wednesday': return item.day_week_schedule === 3
				case 'thursday': return item.day_week_schedule === 4
				case 'friday': return item.day_week_schedule === 5
				case 'saturday': return item.day_week_schedule === 6
				default: return true
			}
		})
	
		setData(filteredData)
	}

	

	

	return (
		<div className={` mt-14  radio w-full justify-center`}>
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
			<div className="my-10  flex gap-12">
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
					className="max-w-[1050px] w-full drop--lg -[#d4e3f1] rounded-none"
					locale={{ emptyText: t('noData') }}
				/>
				<div className={` flex flex-col gap-6 text-sm`}>
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
