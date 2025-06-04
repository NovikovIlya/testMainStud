import { ConfigProvider, Radio, RadioChangeEvent, Spin, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import { DataType } from '../../../models/schedule'
import { useGetCurrentDateQuery, useGetScheduleQuery } from '../../../store/api/serviceApi'
import useWindowOrientation from '../../../utils/hooks/useDeviceOrientation'
import { isMobileDevice } from '../../../utils/hooks/useIsMobile'

import './StyleSchedule.scss'

export const Schedule = () => {
	const { data: schedule, isLoading } = useGetScheduleQuery()
	const {data: dataCurrentDate,isLoading:isLoadingDate} = useGetCurrentDateQuery()
	const [data, setData] = useState<DataType[] | undefined>()
	const isMobile = isMobileDevice()
	const orientation = useWindowOrientation()
	const columns: ColumnsType<DataType> = [
		{
			title: '',
			dataIndex: 'type',
			key: 'type',
			className: '',
			render: (item, item2) => {
				return (
					<div
						className={` ${isMobile ? 'hidden' : ''} !h-[105px] w-[32px] ${
							item2.type === 'Практика'
								? 'bg-[#844EC9]'
								: item2.type === 'Потоковая лекция'
								? 'bg-[#A7FAFF]'
								: item2.type === 'Лекция'
								? 'bg-[#3A92E3]'
								: item2.type === 'Семинар'
								? 'bg-[#FFE24C]'
								: item2.type === 'Лабораторное занятие'
								? 'bg-[#59C348]'
								: item2.type === 'Факультатив'
								? 'bg-[#E93A3A]'
								: item2.type === 'Тестирование'
								? 'bg-[#FF9838]'
								: 'bg-[#B3B3B3]' // Default case for "Тип дисциплины не указан"
						}`}
					></div>
				)
			}
		},
		{
			title: t('time'),
			dataIndex: 'time',
			key: 'time',
			render: item => <p className="text-base whitespace-nowrap">{item}</p>
		},
		{
			title: t('lesson'),
			dataIndex: 'name',
			key: 'name',
			render: item => <p className="text-base">{item}</p>
		},
		{
			title: t('teacher'),
			dataIndex: 'teacher',
			key: 'teacher',
			render: item => <p className="text-base">{item}</p>
		},
		{
			title: t('campus'),
			key: 'building',
			dataIndex: 'building',
			render: item => <p className="text-base">{item}</p>
		},
		{
			title: t('auditorium'),
			key: 'room',
			dataIndex: 'room',
			render: item => <p className="text-base">{item}</p>
		}
	]
	useEffect(() => {
		setData(filterLessonsByDate(schedule?.monday))
	}, [isLoading, schedule,dataCurrentDate])

	const onChange = (e: RadioChangeEvent) => {
		//@ts-ignore
		setData(filterLessonsByDate(schedule[e.target.value]))
	}

	const parseRussianDate = (dateStr: string) => {
		// Преобразуем формат "DD.MM.YYYY" в "YYYY-MM-DD" для создания Date
		const [day, month, year] = dateStr.split('.');
		return new Date(`${year}-${month}-${day}`);
	};

	const isLessonActive = (duration: string) => {
		if (!dataCurrentDate?.date || !duration) return false; // Если данных нет, показываем все предметы
		
		try {
			const currentDate = parseRussianDate(dataCurrentDate?.date);
			const [startDateStr, endDateStr] = duration.split('-');
			
			// Преобразуем строки дат в формате "DD.MM.YY" в объекты Date
			const startParts = startDateStr.split('.');
			const endParts = endDateStr.split('.');
			
			// Создаем даты в формате YYYY-MM-DD
			const startDate = new Date(
				parseInt(`20${startParts[2]}`), // Год (добавляем "20" к двузначному году)
				parseInt(startParts[1]) - 1,    // Месяц (0-11)
				parseInt(startParts[0])         // День
			);
			
			const endDate = new Date(
				parseInt(`20${endParts[2]}`),   // Год
				parseInt(endParts[1]) - 1,      // Месяц
				parseInt(endParts[0])           // День
			);
			console.log(currentDate, startDate, endDate);
			// Проверяем, входит ли текущая дата в диапазон
			return currentDate >= startDate && currentDate <= endDate;
		} catch (error) {
			console.error('Ошибка при обработке дат:', error);
			return true; // В случае ошибки показываем предмет
		}
	}

	const filterLessonsByDate = (lessons: DataType[] | undefined) => {
		if (!lessons) return undefined;
		return lessons?.filter(lesson => isLessonActive(lesson?.duration));
	}

	if (schedule === undefined) return null

	if (isMobile && orientation === 'portrait')
		return (
			<div className="max-w-full text-center mt-10">
				В данном разрешении модуль не работает, пожалуйста поверните телефон
			</div>
	)

	return (
		<Spin  spinning={isLoadingDate}>
		<div className={`${isMobile ? 'mx-0' : 'mx-14'} mt-14  radio w-full justify-center`}>
			{/* <div className="mb-14 text-[28px]">Мое расписание</div> */}
			<Radio.Group onChange={onChange} defaultValue="monday" buttonStyle="solid" className="flex gap-[10px] h-9">
				<Radio.Button className="rounded-full bg-transparent h-full flex items-center  text-base" value="monday">
					{t('monday')}
				</Radio.Button>
				<Radio.Button className="rounded-full h-full flex items-center text-base bg-transparent" value="tuesday">
					{t('tuesday')}
				</Radio.Button>
				<Radio.Button className="rounded-full h-full flex items-center text-base bg-transparent" value="wednesday">
					{t('wednesday')}
				</Radio.Button>
				<Radio.Button className="rounded-full h-full flex items-center text-base bg-transparent" value="thursday">
					{t('thursday')}
				</Radio.Button>
				<Radio.Button className="rounded-full h-full flex items-center text-base bg-transparent" value="friday">
					{t('friday')}
				</Radio.Button>
				<Radio.Button className="rounded-full h-full flex items-center text-base bg-transparent" value="saturday">
					{t('saturday')}
				</Radio.Button>
				<Radio.Button className="rounded-full h-full flex items-center text-base bg-transparent" value="sunday">
					{t('sunday')}
				</Radio.Button>
			</Radio.Group>
			<div className="my-10  flex gap-12">
				<ConfigProvider
					theme={{
						components: {
							Table: {
								headerBg: 'rgb(218, 231, 251)'
							}
						}
					}}
				>
					<Table
						columns={columns}
						dataSource={data}
						pagination={false}
						className="max-w-[1050px] w-full drop--lg -[#d4e3f1] rounded-none"
						locale={{ emptyText: t('noData') }}
					/>
				</ConfigProvider>
				<div className={`${isMobile ? 'hidden' : ''} flex flex-col gap-6 text-sm`}>
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
		</Spin>
	)
}
